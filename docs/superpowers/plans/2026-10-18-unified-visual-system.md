# Unified Visual System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将首页已经确认的水墨编辑式视觉体系扩展到百科、名言、模拟器、历史、关于、五套测评和结果页面，同时保持所有现有功能、内容与本地数据行为不变。

**Architecture:** 继续使用原生多页面架构，通过 `base.css` 和 `components.css` 建立共享视觉令牌与壳层，再由 `pages.css`、`test.css`、`results.css` 分别承载内容页、测评流和结果报告。HTML 与 JavaScript 只增加语义结构、样式类和状态属性；业务数据、计分、存储及路由接口保持不变。

**Tech Stack:** 原生 HTML5、CSS、JavaScript ES Modules、Node.js 内置测试运行器、Chart.js、html2canvas、Codex IAB 浏览器验收。

**Spec:** `docs/superpowers/specs/2026-10-18-unified-visual-system-design.md`

## Global Constraints

- 不引入新框架、包管理依赖或构建步骤。
- 保留现有题库、计分模型、本地存储、历史、图表、图片导出和 URL 结构。
- 当前工作区已有未提交修改；每次提交只暂存本任务新增的代码片段，混合文件使用 `git add -p`，提交前检查 `git diff --cached`。
- 使用现有暖白、墨黑、蓝灰、赭石视觉体系，不加入大圆角、玻璃拟态、霓虹渐变或通用仪表盘装饰。
- 320 像素宽度不得出现横向页面滚动，交互控件须有键盘焦点、可感知标签和实用触控尺寸。
- 深色模式为各组件提供明确状态；结果图片导出始终保持稳定浅色纸张样式。
- 水墨资产优先复用 `assets/images/home/`，不得用粗糙 CSS 绘图或临时占位图替代主要视觉。

## Review Focus

- 320 像素下长问题、长词条和操作按钮必须自然换行且无横向溢出；由 Task 2、Task 4 和 Task 6 的静态断言及浏览器检查覆盖。
- 深色模式下表单、选项、历史条目、图表标签与结果导出必须保持对比度；由 Task 1、Task 3、Task 5 和 Task 6 覆盖。
- 现有本地历史和历史结果链接不得因新类名或结构变化失效；由 Task 3 和 Task 5 的原测试及浏览器路径覆盖。
- Chart.js 或 html2canvas 不可用时，文字结果、分数与失败提示必须仍可阅读；由 Task 3、Task 5 和 Task 6 覆盖。
- 用户现有未提交修改不得被覆盖或误提交；每个任务的提交步骤都要求交互式暂存与缓存差异检查。

---

### Task 1: 共享视觉基础与站点壳层

**Files:**
- Create: `tests/visual-system.test.mjs`
- Modify: `assets/css/base.css`
- Modify: `assets/css/components.css`
- Modify: `assets/js/site.js`

**Interfaces:**
- Consumes: 现有 `data-theme`、`theme-button`、`menu-button`、`nav-links[data-open]` 状态。
- Produces: 稳定的全局令牌、`.site-header`、`.site-footer`、`.page-intro`、按钮、提示、表单和焦点样式，供后续所有页面使用。

- [ ] **Step 1: 编写共享视觉结构失败测试**

在 `tests/visual-system.test.mjs` 中读取三个目标文件，断言：基础 CSS 包含纸张、墨色、蓝灰、赭石、内容宽度和动效令牌；组件 CSS 包含站点壳层、移动菜单、按钮、表单、提示、焦点和暗色状态；`site.js` 仍输出六个主导航链接、主题按钮、菜单按钮和页脚免责声明。

- [ ] **Step 2: 运行测试确认失败**

Run: `node --test --test-isolation=none tests/visual-system.test.mjs`

Expected: FAIL，提示新增的令牌或结构选择器尚不存在。

- [ ] **Step 3: 整理 `base.css` 全局令牌与排版**

保留现有变量名兼容页面代码，补充间距、动效、阅读宽度和暗色表面令牌；统一正文、标题、链接、图片、表单继承、纸张纹理、焦点和减少动态效果规则。

- [ ] **Step 4: 重构 `components.css` 公共组件**

实现桌面与移动导航、页脚、四类按钮、提示条、页面引言、表单控件、状态消息及其浅色／深色／悬停／焦点／禁用状态。保持现有 JavaScript 查询的类名不变。

- [ ] **Step 5: 为 `site.js` 增加语义状态类和当前页兼容**

只添加后续页面需要的类名、`aria-current` 和菜单状态属性；不得改变链接目标、主题持久化或菜单开关逻辑。

- [ ] **Step 6: 运行共享测试和全量测试**

Run: `node --test --test-isolation=none tests/visual-system.test.mjs && npm test`

Expected: 新测试 PASS；全量测试 0 failures。

- [ ] **Step 7: 浏览器检查共享壳层**

在 IAB 中检查 `index.html`、`lexicon.html` 和 `mindset/` 的桌面页头、手机菜单、主题切换、页脚与键盘焦点；控制台无 error 或 warning。

- [ ] **Step 8: 提交任务**

使用 `git add -p` 只暂存本任务片段和新测试，运行 `git diff --cached --check` 并确认缓存差异不包含用户原有修改，然后提交：`feat: unify site visual foundation`。

### Task 2: 百科、名言与关于页面

**Files:**
- Modify: `lexicon.html`
- Modify: `quote.html`
- Modify: `about.html`
- Modify: `assets/css/pages.css`
- Modify: `assets/js/lexicon.js`
- Modify: `assets/js/quotes.js`
- Modify: `tests/visual-system.test.mjs`

**Interfaces:**
- Consumes: Task 1 的 `.page-intro`、表单、按钮、提示、分隔线和主题令牌。
- Produces: `.lexicon-page`、`.lexicon-toolbar`、`.lexicon-entry`、`.quote-stage`、`.article-page` 页面结构，后续 QA 直接按这些选择器定位。

- [ ] **Step 1: 添加内容页面结构失败测试**

扩展 `tests/visual-system.test.mjs`，断言三个 HTML 入口具有各自页面类、原有标题和原有脚本；`lexicon.js` 保留安全词条字段并输出通俗版结构；`quotes.js` 仍绑定 `[data-new-quote]`。

- [ ] **Step 2: 运行测试确认失败**

Run: `node --test --test-isolation=none tests/visual-system.test.mjs`

Expected: FAIL，缺少新页面类或编辑式布局结构。

- [ ] **Step 3: 实现百科编辑式布局**

在 `lexicon.html` 与 `pages.css` 中建立页首、搜索分类工具栏、注释带、两列词条和单列移动布局；在 `lexicon.js` 中只增加类别编号、条目头部和展开区所需类名，不改变过滤与数据渲染逻辑。

- [ ] **Step 4: 实现沉浸式名言页**

在 `quote.html` 与 `pages.css` 中建立全高引文舞台、作者出处、低权重免责声明和水墨／坐标背景；在 `quotes.js` 中增加切换状态类，保留随机选择行为和无障碍文本。

- [ ] **Step 5: 实现关于页编辑长文**

在 `about.html` 与 `pages.css` 中增加文章导言、章节编号、阅读宽度和锚点偏移；保留隐私、免责声明、中立与技术说明的原文和 ID。

- [ ] **Step 6: 运行内容与站点测试**

Run: `node --test --test-isolation=none tests/visual-system.test.mjs tests/content.test.mjs tests/site-links.test.mjs`

Expected: 全部 PASS；无断链、空链接或占位文案。

- [ ] **Step 7: 浏览器检查三个内容页面**

在 1536×1024、768×1024、320×720 下验证百科搜索／分类／展开、名言切换、关于页锚点与深色模式；检查长标题和长词条无溢出。

- [ ] **Step 8: 提交任务**

交互式暂存本任务片段，检查缓存差异后提交：`feat: restyle editorial content pages`。

### Task 3: 模拟器与历史档案页面

**Files:**
- Modify: `simulator.html`
- Modify: `history.html`
- Modify: `assets/css/pages.css`
- Modify: `assets/js/simulator.js`
- Modify: `assets/js/history.js`
- Modify: `tests/visual-system.test.mjs`
- Test: `tests/history.test.mjs`

**Interfaces:**
- Consumes: Task 1 的页面引言、表单、按钮、状态与主题令牌；现有 `PHILOSOPHY_TEST` 和历史存储接口。
- Produces: `.simulator-workbench`、`.simulator-panel`、`.simulator-result`、`.history-archive`、`.history-card`，不改变数据结构。

- [ ] **Step 1: 添加工具页面结构和安全渲染失败测试**

扩展 `tests/visual-system.test.mjs`，断言模拟器和历史入口具有页面类、原脚本与关键数据挂载点；扩展 `tests/history.test.mjs`，确认新增包装元素仍使用 `textContent` 写入记录字段且查看链接保持编码。

- [ ] **Step 2: 运行测试确认失败**

Run: `node --test --test-isolation=none tests/visual-system.test.mjs tests/history.test.mjs`

Expected: FAIL，缺少新的工作台或档案结构。

- [ ] **Step 3: 实现思想坐标工作台**

在 `simulator.html`、`simulator.js` 和 `pages.css` 中重组标题区、六条滑块、雷达图和接近度列表的样式类；保持输入 ID、`data-dimension`、实时更新和 Chart.js 降级文案不变。

- [ ] **Step 4: 实现私人思想档案**

在 `history.html`、`history.js` 和 `pages.css` 中建立档案页首、工具栏、时间信息、主要结果、分数摘要、查看和删除层级；保留单条删除、清空确认、空状态和安全 DOM 创建方式。

- [ ] **Step 5: 运行工具与全量测试**

Run: `node --test --test-isolation=none tests/visual-system.test.mjs tests/history.test.mjs && npm test`

Expected: 全部 PASS，0 failures。

- [ ] **Step 6: 浏览器检查工具交互**

拖动六条滑块并确认图表和匹配列表同步；创建或使用本地历史记录，验证查看、删除和清空确认；模拟图表不可用时文字信息仍可读。

- [ ] **Step 7: 提交任务**

交互式暂存并检查缓存差异后提交：`feat: restyle philosophy tools and history`。

### Task 4: 五套测评流程

**Files:**
- Modify: `assets/css/test.css`
- Modify: `assets/js/test-app.js`
- Modify: `mindset/index.html`
- Modify: `philosophy/index.html`
- Modify: `metaphysics/index.html`
- Modify: `politics/index.html`
- Modify: `ethics/index.html`
- Modify: `tests/visual-system.test.mjs`
- Create: `tests/test-app-ui.test.mjs`

**Interfaces:**
- Consumes: Task 1 的壳层、按钮、提示、令牌；现有测试定义、存储和计分接口。
- Produces: 共享 `.test-experience`、`.test-progress`、`.answer-option`、`.test-actions` 结构，五套测试只通过标题和强调色变体区分。

- [ ] **Step 1: 添加测评壳层失败测试**

在 `tests/test-app-ui.test.mjs` 中断言五个入口继续加载相同公共 CSS／JS 与各自 `app.js`，每个页面具有唯一测试主题类；断言 `test-app.js` 输出问题标题、题号、已答数量、进度、五个可访问单选项、键盘提示和操作区。

- [ ] **Step 2: 运行测试确认失败**

Run: `node --test --test-isolation=none tests/visual-system.test.mjs tests/test-app-ui.test.mjs`

Expected: FAIL，缺少测试主题类或新的测评结构选择器。

- [ ] **Step 3: 实现共享测评体验样式**

在 `test.css` 中实现专注阅读宽度、题目排版、稳定进度区、整行答案选项、选中／悬停／焦点／禁用状态、桌面操作栏和手机单列操作区；深色模式必须覆盖所有状态。

- [ ] **Step 4: 为五套入口增加主题类**

仅为各 `index.html` 的 `body` 或主区域增加测试 ID 类和语义包装；保留现有必要声明、资源路径和脚本加载顺序。

- [ ] **Step 5: 为 `test-app.js` 增加结构类和状态属性**

保留题目推进、键盘数字键、上一题、恢复进度、结果生成与存储逻辑；只调整渲染层级、类名、`aria-checked`／状态提示等表现接口。

- [ ] **Step 6: 运行测评与全量测试**

Run: `node --test --test-isolation=none tests/visual-system.test.mjs tests/test-app-ui.test.mjs tests/test-session.test.mjs tests/scoring.test.mjs tests/storage.test.mjs && npm test`

Expected: 所有测试 PASS，题目数量、计分和存储测试无回退。

- [ ] **Step 7: 浏览器检查完整测评路径**

至少完整验证心智认知测试，并抽查其余四套测试的首题与结果入口；检查数字键、选择后推进、上一题、刷新恢复、手机换行和深色模式。

- [ ] **Step 8: 提交任务**

交互式暂存并检查缓存差异后提交：`feat: unify assessment experience`。

### Task 5: 即时结果、历史结果与导出报告

**Files:**
- Modify: `results.html`
- Modify: `assets/css/results.css`
- Modify: `assets/js/results.js`
- Modify: `assets/js/history-result.js`
- Modify: `tests/visual-system.test.mjs`
- Test: `tests/results.test.mjs`
- Test: `tests/export-image.test.mjs`

**Interfaces:**
- Consumes: Task 1 的令牌和按钮；Task 4 生成的结果模型；现有 Chart.js、html2canvas 和历史记录接口。
- Produces: `.result-report`、`.result-summary`、`.result-grid`、`.result-interpretation`、`.related-results`、`.result-actions`；导出接口和数据属性保持兼容。

- [ ] **Step 1: 添加报告结构失败测试**

扩展 `tests/visual-system.test.mjs` 与 `tests/results.test.mjs`，断言即时结果和历史结果共用报告类；主要结果、维度、通俗解释、相近倾向、免责声明和操作区均存在；百科链接和模型匹配度文案不变。

- [ ] **Step 2: 运行测试确认失败**

Run: `node --test --test-isolation=none tests/visual-system.test.mjs tests/results.test.mjs tests/export-image.test.mjs`

Expected: FAIL，缺少新的报告结构类。

- [ ] **Step 3: 实现思想画像报告**

在 `results.js` 和 `results.css` 中建立报告摘要、图表／维度双栏、解读、通俗说明、相近倾向和操作区；保持 `data-result-capture`、`data-result-chart`、`data-export-result`、`data-restart-test` 接口不变。

- [ ] **Step 4: 统一历史结果入口**

在 `results.html` 和 `history-result.js` 中复用同一报告视觉与错误通知；保留安全查询参数、记录不存在提示和返回历史入口。

- [ ] **Step 5: 固定导出模式**

在 `results.css` 中明确浅色纸张背景、墨色文字、图表和免责声明；确保深色页面导出的图片仍为稳定浅色，且导出后恢复原状态。

- [ ] **Step 6: 运行结果、导出和全量测试**

Run: `node --test --test-isolation=none tests/visual-system.test.mjs tests/results.test.mjs tests/export-image.test.mjs && npm test`

Expected: 全部 PASS；导出并发、失败恢复和免责声明测试无回退。

- [ ] **Step 7: 浏览器检查报告路径**

完成一套测试并检查结果页；从历史页打开同一记录；验证雷达图、分数、百科链接、重新测试和 PNG 导出；模拟 CDN 失败时文字结果仍完整。

- [ ] **Step 8: 提交任务**

交互式暂存并检查缓存差异后提交：`feat: redesign philosophy result reports`。

### Task 6: 跨页面响应式、深色模式与设计 QA

**Files:**
- Modify: `assets/css/base.css`
- Modify: `assets/css/components.css`
- Modify: `assets/css/pages.css`
- Modify: `assets/css/test.css`
- Modify: `assets/css/results.css`
- Modify: `design-qa.md`
- Create: `docs/qa/unified-visual-system-ledger.md`
- Modify: `tests/visual-system.test.mjs`

**Interfaces:**
- Consumes: Tasks 1–5 的全部页面类和状态。
- Produces: 经桌面、平板、手机、浅色、深色和关键交互验证的可发布整站视觉系统。

- [ ] **Step 1: 添加跨页面保护测试**

扩展 `tests/visual-system.test.mjs`，断言五个 CSS 层均包含移动断点或由共享层覆盖；关键页面具有唯一 H1、主内容区域、原脚本和页面主题类；发布 HTML 不包含空链接、TODO 或占位内容。

- [ ] **Step 2: 运行测试确认失败**

Run: `node --test --test-isolation=none tests/visual-system.test.mjs tests/site-links.test.mjs tests/smoke.test.mjs`

Expected: FAIL，指出尚未覆盖的页面或响应式状态。

- [ ] **Step 3: 修复跨视口和暗色缺口**

只处理浏览器检查中确认的问题：320 像素溢出、标题断裂、触控尺寸、图表高度、菜单遮挡、长词条、深色对比、焦点可见性和 200% 文本缩放。不得借此添加规格外组件。

- [ ] **Step 4: 执行全站浏览器矩阵**

在 IAB 中按 1536×1024、1024×768、768×1024、320×720 检查首页、百科、名言、模拟器、历史、关于、一个测评流程、即时结果和历史结果；同时检查浅色与深色。记录 `scrollWidth`、控制台日志和关键交互结果。

- [ ] **Step 5: 编写设计一致性台账**

在 `docs/qa/unified-visual-system-ledger.md` 记录至少五项具体比较：导航与壳层、字体层级、色彩与表面、分隔线与容器模型、水墨资产处理、测评交互、结果报告、移动端和深色模式。每项写明发现、证据、修复和最终状态。

- [ ] **Step 6: 运行最终验证**

Run: `npm test`

Expected: 0 failures。

Run: `git diff --check`

Expected: 无空白错误；CRLF 提示不视为失败。

检查 IAB 控制台：Expected: 0 errors, 0 warnings。

- [ ] **Step 7: 请求整分支代码审查**

使用 `superpowers:requesting-code-review` 对规格、计划、实现差异、测试结果和 QA 台账进行整分支审查；修复所有 P0、P1、P2 问题并重新运行 Step 6。

- [ ] **Step 8: 提交最终 QA**

只暂存本任务 QA 文档、测试和修复片段，检查缓存差异后提交：`test: verify unified visual system`。

## Completion Evidence

- `npm test` 输出全部测试通过且 0 failures。
- `git diff --check` 无错误。
- IAB 在四个规定视口、浅色和深色下完成页面矩阵检查，控制台无错误或警告。
- 百科搜索／筛选、名言切换、模拟器滑块、测评流程、历史查看／删除、结果图表和导出均真实工作。
- `docs/qa/unified-visual-system-ledger.md` 记录无未解决 P0、P1、P2 问题。
