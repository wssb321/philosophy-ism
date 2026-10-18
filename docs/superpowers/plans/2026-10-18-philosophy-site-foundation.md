# 哲学主义站点基础 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立可直接静态部署的站点骨架、设计系统、全站导航以及首页、百科、名言和关于页面。

**Architecture:** 使用原生 HTML、CSS 和 ES Modules；共享导航、主题与内容数据放在 `assets/` 下，页面只负责自身渲染。Node 内置测试运行器验证数据和纯函数，浏览器通过本地静态服务器验收。

**Tech Stack:** HTML5、CSS3、JavaScript ES2022、Node.js `node:test`

**Spec:** `docs/superpowers/specs/2026-10-18-philosophy-values-site-design.md`

## Global Constraints

- 无后端、无账号、无构建步骤，核心页面可静态部署。
- 界面支持浅色、深色、移动端、键盘操作和减少动态效果。
- 文案保持中立，不使用“正确”“错误”“成熟”等评价标签。
- 形而上学页面必须包含规格中的双定义固定说明。
- 用户数据不得上传。

## Review Focus

- 浏览器禁用本地存储时，主题仍可按系统偏好展示且页面不报错；由 Task 2 测试。
- 搜索字符串包含空格、英文大小写或不存在词条时，筛选结果稳定；由 Task 3 测试。
- URL 带未知锚点时，百科仍正常渲染并显示全部条目；由 Task 3 浏览器检查。
- 名言数据缺失出处时不得伪造出处；由 Task 3 数据测试。
- 320px 视口下导航和卡片不得产生横向滚动；由 Task 4 浏览器检查。

---

### Task 1: 项目与验证骨架

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `tests/smoke.test.mjs`
- Create: `README.md`
- Create: `index.html`
- Create: `lexicon.html`
- Create: `quote.html`
- Create: `about.html`
- Create: `simulator.html`
- Create: `history.html`
- Create: `mindset/index.html`
- Create: `philosophy/index.html`
- Create: `metaphysics/index.html`
- Create: `politics/index.html`
- Create: `ethics/index.html`
- Create: `assets/css/base.css`
- Create: `assets/js/site.js`

**Interfaces:**
- Consumes: 无。
- Produces: `npm test` 运行全部 `tests/**/*.test.mjs`；`README.md` 记录 `python -m http.server 4173` 预览方式。

- [ ] **Step 1: 写失败的项目结构冒烟测试**

在 `tests/smoke.test.mjs` 中断言六个全站页面、五个测试入口、`assets/css/base.css` 和 `assets/js/site.js` 均存在。

- [ ] **Step 2: 运行测试并确认失败**

Run: `node --test tests/smoke.test.mjs`
Expected: FAIL，提示首页或公共资源不存在。

- [ ] **Step 3: 创建最小项目清单和说明**

`package.json` 提供 `test: node --test`；`.gitignore` 忽略编辑器、系统和测试截图临时文件；创建冒烟测试要求的最小语义化页面和资源文件，后续阶段页面可先显示明确的“建设中”说明。若目录尚非 Git 仓库，先执行 `git init`。

- [ ] **Step 4: 运行测试并确认通过**

Run: `npm test`
Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add .gitignore package.json README.md tests index.html lexicon.html quote.html about.html simulator.html history.html assets mindset philosophy metaphysics politics ethics
git commit -m "chore: scaffold static philosophy site"
```

### Task 2: 设计系统、主题与导航

**Files:**
- Modify: `assets/css/base.css`
- Create: `assets/css/components.css`
- Create: `assets/css/pages.css`
- Create: `assets/js/theme.js`
- Modify: `assets/js/site.js`
- Create: `tests/theme.test.mjs`
- Modify: `index.html`
- Modify: `lexicon.html`
- Modify: `quote.html`
- Modify: `about.html`

**Interfaces:**
- Consumes: 浏览器 `document`、`matchMedia` 和可选 `localStorage`。
- Produces: `getPreferredTheme(storage, prefersDark) -> "light" | "dark"`、`setTheme(theme, storage, root)`、`initSiteShell()`。

- [ ] **Step 1: 写主题纯函数失败测试**

断言有效存储值优先于系统偏好、非法值回退到系统偏好、存储抛错时仍返回主题。

- [ ] **Step 2: 运行主题测试并确认失败**

Run: `node --test tests/theme.test.mjs`
Expected: FAIL，模块或导出不存在。

- [ ] **Step 3: 实现主题接口和公共站点壳**

实现 CSS tokens、排版、按钮、卡片、导航、焦点样式、响应式断点和 `prefers-reduced-motion`；`initSiteShell()` 注入一致的导航交互并标记当前页面。

- [ ] **Step 4: 运行测试并确认通过**

Run: `npm test`
Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add assets index.html lexicon.html quote.html about.html tests/theme.test.mjs
git commit -m "feat: add responsive site shell and themes"
```

### Task 3: 首页、百科、名言与关于内容

**Files:**
- Create: `assets/data/lexicon.js`
- Create: `assets/data/quotes.js`
- Create: `assets/js/lexicon.js`
- Create: `assets/js/quotes.js`
- Create: `tests/content.test.mjs`
- Create: `tests/lexicon.test.mjs`
- Modify: `index.html`
- Modify: `lexicon.html`
- Modify: `quote.html`
- Modify: `about.html`

**Interfaces:**
- Consumes: Task 2 的站点壳和主题。
- Produces: `LEXICON_ENTRIES`、`QUOTES`、`filterEntries(entries, query, category) -> Entry[]`、`pickQuote(quotes, randomValue) -> Quote`。

- [ ] **Step 1: 写内容与筛选失败测试**

断言规格列出的全部百科词条存在且 ID 唯一；固定形而上学说明存在；名言均有作者和可验证的出处说明或“意译”标记；筛选支持名称、关键词、分类、空查询和无结果。

- [ ] **Step 2: 运行内容测试并确认失败**

Run: `node --test tests/content.test.mjs tests/lexicon.test.mjs`
Expected: FAIL，数据模块不存在。

- [ ] **Step 3: 实现数据、渲染与页面内容**

首页展示五套测试及预计用时；百科条目包含定义、核心主张和概念区分；名言页刷新和点击均随机换句；关于页包含隐私、免责声明和开源说明。

- [ ] **Step 4: 运行测试并确认通过**

Run: `npm test`
Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add index.html lexicon.html quote.html about.html assets tests
git commit -m "feat: add philosophy content pages"
```

### Task 4: 第一阶段浏览器验收

**Files:**
- Modify: 第一阶段中发现问题的具体 HTML/CSS/JS 文件
- Create: `docs/qa/foundation-checklist.md`

**Interfaces:**
- Consumes: Tasks 1–3 的页面。
- Produces: 已验证的站点基础与验收记录。

- [ ] **Step 1: 启动静态服务器并逐页检查**

Run: `python -m http.server 4173`
Expected: `http://localhost:4173/` 可访问。

- [ ] **Step 2: 验证桌面与移动端关键行为**

检查 320px、768px、1440px；验证导航、主题、焦点、百科搜索、锚点和随机名言，并记录实际结果。

- [ ] **Step 3: 修复验收中发现的问题**

每个修复只修改对应责任文件，不增加规格外功能。

- [ ] **Step 4: 重新运行自动测试和浏览器检查**

Run: `npm test`
Expected: 全部 PASS，三种视口无横向滚动。

- [ ] **Step 5: 提交**

```bash
git add .
git commit -m "test: verify foundation pages"
```

