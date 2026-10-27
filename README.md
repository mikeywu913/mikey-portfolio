# Mikey Wu · 个人作品集

基于 React、Vite 和 Motion 的中英双语作品集，包含项目案例、影像、摄影、视觉设计和音乐档案。

## 本地开发

需要 Node.js 24 和 npm。

```powershell
npm ci
npm run dev
```

检查与构建：

```powershell
npm run check:media
npm run lint
npm run build
npm run preview
```

## GitHub Pages 部署

已提供 `.github/workflows/deploy.yml`。推送到 `main` 后会检查媒体路径、检查代码、构建网站并部署 `dist`。也可以在 Actions 页面手动运行。

首次发布：

1. 在 GitHub 创建空仓库，暂时不要自动添加 README、License 或 `.gitignore`。
2. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 连接这个本地项目并推送 `main`；等待 Actions 的部署任务完成。
4. 使用部署任务输出的 Pages 地址访问网站。

仓库可以叫 `my-first-site`，也可以用其他名字。workflow 从 Pages 配置读取实际路径，通过 `VITE_BASE_PATH` 传给 Vite，不需要把仓库名写死。个人主页仓库或自定义域名使用根路径，普通项目仓库使用 `/仓库名/`。

本地模拟子目录部署（例如 `/my-first-site/`）：

```powershell
$env:VITE_BASE_PATH = '/my-first-site/'
npm run build
npm run preview
```

结束模拟后，在同一终端恢复默认：

```powershell
Remove-Item Env:VITE_BASE_PATH
npm run build
```

## 更新作品

- `src/works.js`：视频、摄影、视觉设计、音乐和社媒链接。
- `src/projects.js`：项目详情、个人分工与成果。
- `public/works/images/`：作品原图与封面。
- `public/works/audio/`：后续加入的 MP3、WAV 等音频。

本地作品路径使用 `/works/...`，展示时由 `src/assetUrl.js` 加上部署前缀。Bilibili、网易云及其他 HTTPS 链接保持原样。修改后运行 `npm run check:media`，确保文件存在且大小写一致，避免 Windows 正常而 GitHub 构建找不到文件。

`dist`、`node_modules`、日志和 `design-backups` 是本地文件，不提交到 GitHub。部署只发布构建结果，图片上传到 `public/works/` 后会随下次部署一起发布。

部署说明参考 [Vite 官方文档](https://vite.dev/guide/static-deploy.html#github-pages) 和 [GitHub Pages 自定义 workflow 文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
