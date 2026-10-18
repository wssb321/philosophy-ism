# 哲学主义

一个完全在浏览器中运行的中文哲学思想测评站。它由五套中立测评、主义百科、随机名言、六维立场模拟器和本地历史记录组成，**没有后端、没有数据库、没有构建步骤**，把静态文件放到任意托管服务上就能跑。

> 我们不是告诉你该相信什么，而是帮助你更清楚地思考。

## 目录

- [这是什么](#这是什么)
- [功能一览](#功能一览)
- [五套测评](#五套测评)
- [技术栈](#技术栈)
- [本地运行](#本地运行)
- [自动校验](#自动校验)
- [项目结构](#项目结构)
- [隐私与降级](#隐私与降级)
- [部署](#部署)
- [许可](#许可)

## 这是什么

「哲学主义」是一组面向普通读者的中立哲学测评。它用日常语言讨论心智、人生、认识、政治与伦理五个领域，帮你在更大的思想坐标里看清自己的倾向——不贴标签，也不下判断。

站点包含三类内容：

1. **测评**：回答一组陈述句（非常不同意 → 非常同意），得到维度得分与相近的思想传统。
2. **百科**：42 个思想词条，每个都给出定义、核心主张、概念区分，并附一份「一句话说清 / 举个例子 / 它主张什么 / 容易和谁搞混」的通俗版讲解。
3. **工具**：随机名言、立场模拟器，以及保存在本机的历史记录。

## 功能一览

| 功能 | 说明 |
| --- | --- |
| 五套中立测评 | 心智认知、人生哲学、形而上学与认识论、政治理念、道德伦理 |
| 雷达图结果页 | Chart.js 绘制维度雷达图，同时给出文字版维度得分，图表失效也不影响阅读 |
| 结果解读 | 综合倾向的百科词条通俗版讲解**直接展开显示**，无需再点击跳转 |
| 相近的哲学倾向 | 列出匹配度靠前的其他传统，并可跳转到对应词条 |
| 主义百科 | 42 个词条，支持关键词搜索与分类筛选，可折叠查看通俗版讲解 |
| 随机名言 | 18 条带出处的哲学家名言，可随机切换 |
| 立场模拟器 | 直接拖动六条坐标，实时计算与各人生哲学流派之间的距离 |
| 历史记录 | 记录保存在浏览器本地，**可点击任意一条回看完整结果**，支持单条删除与一键清空 |
| 结果导出 | 用 html2canvas 把结果页保存成高清 PNG |
| 深浅主题 | 主题切换结果保存在浏览器，刷新后保持 |

## 五套测评

| 入口 | 名称 | 题量 | 结果形式 |
| --- | --- | --- | --- |
| `mindset/` | 心智认知 | 30 题 | 匹配到一种心智取向 |
| `philosophy/` | 人生哲学 | 36 题 | 匹配到一种人生哲学传统 |
| `metaphysics/` | 形而上学与认识论 | 32 题 | 四条独立维度坐标（不做单一标签） |
| `politics/` | 政治理念 | 40 题 | 匹配到一种政治思想传统 |
| `ethics/` | 道德伦理 | 40 题 | 匹配到一种伦理理论 |

## 技术栈

- **纯静态前端**：原生 ES Module + 原生 DOM API，无框架、无打包器
- **样式**：手写 CSS，使用自定义属性支持深浅主题与响应式布局
- **图表**：Chart.js（CDN，雷达图）
- **图片导出**：html2canvas（CDN）
- **存储**：浏览器 `localStorage`（版本化，读写失败时安全降级）
- **测试**：Node.js 原生 `node:test`

设计原则是**零依赖、零构建**：仓库里的文件就是最终产物，`git clone` 后直接起一个静态服务器即可预览，也便于任何人读懂和改。

## 本地运行

Windows 用户可以直接双击项目根目录的 **`启动网站.cmd`**。它会启动本地网站并自动打开浏览器，不需要额外安装项目依赖。

也可以在项目根目录运行：

```powershell
npm start
```

随后访问 <http://127.0.0.1:4173/>。关闭命令窗口即可停止网站。

项目没有构建步骤，也可以使用其他静态文件服务器：

```powershell
python -m http.server 4173
```

然后访问 <http://localhost:4173/>。

> 不要直接双击 HTML 文件打开。浏览器会出于安全策略限制 `file://` 下的 ES Module 加载，页面会白屏。

如果用的是 Node.js，也可以用：

```powershell
npx serve -l 4173
```

想让同一局域网内的其他人访问，把服务器绑定到所有网卡并告知你的内网 IP：

```powershell
python -m http.server 4173 --bind 0.0.0.0
```

## 自动校验

```powershell
npm test
```

测试使用 Node.js 原生测试运行器，覆盖：

- 各套题库的题量与维度平衡
- 计分与流派匹配算法
- 版本化本地存储、历史记录字段白名单与安全渲染（不使用 `innerHTML` 注入记录字段）
- 立场模拟器、结果视图模型与历史结果页
- 结果图片导出
- 全站本地链接与锚点是否可达

## 项目结构

```
.
├── index.html              首页（测评入口与人生哲学扩展阅读）
├── lexicon.html            主义百科
├── quote.html              随机名言
├── simulator.html          立场模拟器
├── history.html            本地历史记录
├── results.html            历史记录详情页（按记录 id 重建完整结果）
├── about.html              关于网站
├── mindset/                心智认知测评
├── philosophy/             人生哲学测评
├── metaphysics/            形而上学与认识论测评
├── politics/               政治理念测评
├── ethics/                 道德伦理测评
│   ├── index.html          页面骨架
│   ├── app.js              启动测试
│   └── definition.js       题库与流派定义
├── assets/
│   ├── css/                全站样式（基础、组件、页面、测评、结果）
│   ├── js/                 计分、会话、存储、结果、模拟器、历史等公共模块
│   ├── data/               主义百科与名言数据
│   └── images/             插画与图标
├── tests/                  Node.js 原生测试
└── docs/                   需求、规格、实施计划与验收记录
```

每个测评目录结构一致：`index.html` 提供骨架，`app.js` 负责启动，`definition.js` 保存题库、维度与流派定义。公共逻辑全部收在 `assets/js/`，五套测评共用同一套计分与结果渲染流程。

## 隐私与降级

- 回答、进度和历史记录**只保存在当前浏览器的 `localStorage`**，不上传、不收集、不跨设备同步。
- 历史记录只保存展示所需的字段（类别、时间、维度分数、结果名称），并在渲染时使用 `textContent` 而非 `innerHTML`。
- Chart.js 与 html2canvas 通过 CDN 加载；即使 CDN 不可用，完整文字结果仍然可读，导出按钮会给出打印或系统截图建议。

## 部署

站点是纯静态文件，任何静态托管都能直接使用。入口是 `index.html`，不需要服务端路由、数据库或环境变量。

### 一、推送到 GitHub（开源）

本仓库当前还没有初始化 git。请在本机终端依次执行：

```powershell
git init
git add -A
git commit -m "chore: 初始化哲学主义测评站"
```

登录 GitHub CLI（首次使用会打开浏览器授权）：

```powershell
gh auth login
```

一条命令创建公开仓库并推送（仓库名可自行修改）：

```powershell
gh repo create philosophy-values-site --public --source=. --remote=origin --push
```

如果不用 `gh`，也可以先在网页上手动建好空仓库，然后：

```powershell
git branch -M main
git remote add origin https://github.com/<你的用户名>/philosophy-values-site.git
git push -u origin main
```

> 仓库里会一并带上 `LICENSE`，这样代码才真正是「开源」而不是「保留所有权利」。

### 二、部署到 Vercel

登录 Vercel（同样会打开浏览器授权）：

```powershell
npx vercel login
```

关联到你的账号或团队（`bsw-s-projects` 对应 <https://vercel.com/bsw-s-projects>）：

```powershell
npx vercel link --scope bsw-s-projects
```

部署到生产环境：

```powershell
npx vercel --prod --scope bsw-s-projects
```

首次执行时会问几个问题，按下面的答案填即可：

| 问题 | 建议回答 |
| --- | --- |
| Set up and deploy? | `Y` |
| Which scope? | `bsw-s-projects` |
| Link to existing project? | `N` |
| Project name? | `philosophy-values-site` |
| In which directory is your code located? | `./` |

Vercel 会把整站按静态站点发布，不需要构建命令。部署成功后会输出一个 `https://<项目名>.vercel.app` 地址，任何人都能直接打开——这就是「让他人能够看到」的方式。

> 更省事的做法：在 GitHub 上推完代码后，把仓库导入 Vercel 面板（Add New → Project → Import Git Repository），之后每次 `git push` 都会自动重新部署。

### 三、注意事项

- `.gitignore` 已排除 `node_modules/`、`.playwright-mcp/`、`.superpowers/` 和本地临时输出，仓库不会带上无关文件。
- 站点全部使用相对路径，部署在根域名或子目录都能正常工作。
- 词条与名言数据都在 `assets/data/`，新增内容不需要改动任何逻辑代码。

## 许可

本项目以 MIT 许可证开源，详见 [LICENSE](LICENSE)。
