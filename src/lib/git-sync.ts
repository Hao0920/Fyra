import git from 'isomorphic-git';
import http from 'isomorphic-git/http/web';
import LightningFS from '@isomorphic-git/lightning-fs';
import { db } from './db';
import { encrypt, decrypt } from './crypto';
import type { SyncConfig, SyncState } from '@/types';

const DATA_FILE = 'data.json';

export class GitSyncEngine {
  private fs: LightningFS;
  private dir: string;
  private config: SyncConfig;

  constructor(config: SyncConfig) {
    this.config = config;
    this.dir = `/fyra-${config.owner}-${config.repo}`;
    this.fs = new LightningFS('fyra-fs');
  }

  async init(): Promise<void> {
    await this.fs.promises.mkdir(this.dir, { recursive: true });

    try {
      await git.clone({
        fs: this.fs,
        http,
        dir: this.dir,
        url: `https://github.com/${this.config.owner}/${this.config.repo}`,
        ref: this.config.branch,
        singleBranch: true,
        onAuth: () => ({ username: this.config.token }),
      });
    } catch (e: any) {
      if (e.message?.includes('not found')) {
        await this.fs.promises.mkdir(this.dir, { recursive: true });
        await git.init({ fs: this.fs, dir: this.dir, defaultBranch: this.config.branch });

        await this.fs.promises.writeFile(
          `${this.dir}/README.md`,
          '# Fyra 记账数据\n\n此仓库由 Fyra 应用自动管理，请勿手动修改。'
        );
        await git.add({ fs: this.fs, dir: this.dir, filepath: 'README.md' });
        await git.commit({
          fs: this.fs,
          dir: this.dir,
          message: 'init',
          author: { name: 'Fyra', email: 'fyra@local' },
        });
      } else {
        throw e;
      }
    }
  }

  async sync(): Promise<SyncState> {
    try {
      await this.pull();

      const data = await this.exportData();
      const payload = this.config.encrypt && this.config.password
        ? await encrypt(JSON.stringify(data), this.config.password)
        : JSON.stringify(data, null, 2);

      await this.fs.promises.writeFile(`${this.dir}/${DATA_FILE}`, payload);

      const status = await git.status({ fs: this.fs, dir: this.dir, filepath: DATA_FILE });
      if (status !== 'unmodified') {
        await git.add({ fs: this.fs, dir: this.dir, filepath: DATA_FILE });
        await git.commit({
          fs: this.fs,
          dir: this.dir,
          message: `sync: ${new Date().toISOString()}`,
          author: { name: 'Fyra', email: 'fyra@local' },
        });

        await git.push({
          fs: this.fs,
          http,
          dir: this.dir,
          remote: 'origin',
          ref: this.config.branch,
          onAuth: () => ({ username: this.config.token }),
        });
      }

      return {
        status: 'success',
        lastSync: new Date().toISOString(),
        error: null,
        pendingChanges: 0,
      };
    } catch (e: any) {
      return {
        status: 'error',
        lastSync: null,
        error: e.message,
        pendingChanges: 0,
      };
    }
  }

  async pull(): Promise<void> {
    try {
      await git.pull({
        fs: this.fs,
        http,
        dir: this.dir,
        remote: 'origin',
        ref: this.config.branch,
        onAuth: () => ({ username: this.config.token }),
        fastForwardOnly: true,
      });
    } catch {
      // 首次或无远程分支
    }
  }

  async restore(): Promise<void> {
    const filePath = `${this.dir}/${DATA_FILE}`;
    try {
      await this.fs.promises.access(filePath);
    } catch {
      return;
    }

    const raw = await this.fs.promises.readFile(filePath, 'utf8');
    const payload = this.config.encrypt && this.config.password
      ? await decrypt(raw, this.config.password)
      : raw;

    const data = JSON.parse(payload);
    await this.importData(data);
  }

  private async exportData() {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      transactions: await db.transactions.toArray(),
      accounts: await db.accounts.toArray(),
      categories: await db.categories.toArray(),
      projects: await db.projects.toArray(),
      tags: await db.tags.toArray(),
      budgets: await db.budgets.toArray(),
      settings: (await db.settings.toArray())[0],
    };
  }

  private async importData(data: any) {
    await db.transaction('rw', 
      [db.transactions, db.accounts, db.categories, db.projects, db.tags, db.budgets, db.settings],
      async () => {
        await db.transactions.clear();
        await db.accounts.clear();
        await db.categories.clear();
        await db.projects.clear();
        await db.tags.clear();
        await db.budgets.clear();

        if (data.transactions?.length) await db.transactions.bulkAdd(data.transactions);
        if (data.accounts?.length) await db.accounts.bulkAdd(data.accounts);
        if (data.categories?.length) await db.categories.bulkAdd(data.categories);
        if (data.projects?.length) await db.projects.bulkAdd(data.projects);
        if (data.tags?.length) await db.tags.bulkAdd(data.tags);
        if (data.budgets?.length) await db.budgets.bulkAdd(data.budgets);
        if (data.settings) await db.settings.put(data.settings);
      }
    );
  }
}

export function createGitHubRepoUrl(owner: string, repo: string): string {
  return `https://github.com/${owner}/${repo}`;
}
