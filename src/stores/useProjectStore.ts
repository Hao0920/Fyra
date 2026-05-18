import { create } from 'zustand';
import { db } from '@/lib/db';
import { generateId, nowISO } from '@/lib/utils';
import type { Project } from '@/types';

interface ProjectState {
  projects: Project[];
  load: () => Promise<void>;
  add: (data: Omit<Project, 'id' | 'createdAt'>) => Promise<void>;
  update: (id: string, data: Partial<Project>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  getById: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],

  load: async () => {
    const list = await db.projects.toArray();
    set({ projects: list.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()) });
  },

  add: async (data) => {
    const project: Project = {
      ...data,
      id: generateId(),
      createdAt: nowISO(),
    };
    await db.projects.add(project);
    get().load();
  },

  update: async (id, data) => {
    await db.projects.update(id, data);
    get().load();
  },

  remove: async (id) => {
    await db.projects.delete(id);
    get().load();
  },

  getById: (id) => get().projects.find(p => p.id === id),
}));
