# Fyra 部署指南（Cloudflare Pages）

## 架构

```
┌─────────────┐     ┌─────────────────┐     ┌─────────────┐
│   前端 SPA   │────▶│ Cloudflare Pages │────▶│  GitHub API │
│  (PWA)      │     │  (静态托管)       │     │  (数据存储)  │
└─────────────┘     └─────────────────┘     └─────────────┘
```

纯静态架构：
- **Cloudflare Pages** 托管前端 SPA（React + Vite）
- **GitHub API** 直接从前端调用（CORS 已开放）
- **IndexedDB** 本地缓存，离线可用
- **isomorphic-git** 浏览器内执行 Git 操作

## 部署步骤

### 1. 准备 GitHub Token

1. GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → 勾选 `repo` 权限
3. 复制 token（仅显示一次）

### 2. 构建项目

```bash
npm install
npm run build
```

### 3. 部署到 Cloudflare Pages

**方式 A：Wrangler CLI**
```bash
npm install -g wrangler
wrangler pages deploy dist --project-name=fyra
```

**方式 B：Git 集成（推荐）**
1. GitHub 创建仓库，推送代码
2. Cloudflare Dashboard → Pages → Create a project
3. 连接 GitHub 仓库
4. Build command: `npm run build`
5. Build output directory: `dist`

### 4. 自定义域名（可选）

Cloudflare Dashboard → Pages → fyra → Custom domains → 添加域名

## 首次使用

1. 访问部署的 URL
2. 设置页面输入 GitHub Token 和仓库名（如 `username/fyra-data`）
3. 应用自动创建仓库并初始化数据

## 纯离线模式

不配置 GitHub 同步也能使用：
- 数据存储在浏览器 IndexedDB
- 支持导入/导出 JSON 备份
- 适合隐私敏感场景
