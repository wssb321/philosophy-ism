# 哲学主义结果工具与发布 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成立场模拟器、本地历史、结果图片导出、全站集成和发布前质量验证。

**Architecture:** 模拟器复用人生哲学定义和公共匹配算法；历史页只读取版本化 store；图片导出接收已渲染的结果节点，不重新计分。最终阶段集中完成链接、无障碍、CDN 降级和响应式回归。

**Tech Stack:** HTML5、CSS3、JavaScript ES2022、Chart.js CDN、html2canvas CDN、Node.js `node:test`

**Spec:** `docs/superpowers/specs/2026-10-18-philosophy-values-site-design.md`

## Global Constraints

- 模拟器实时刷新雷达图和流派匹配，但不写入正式测试历史。
- 历史记录仅含测试类别、完成时间、维度分数和结果名称。
- 导出 PNG 使用至少 2 倍像素比例并固定包含免责声明。
- html2canvas 失败不得影响结果阅读。
- 发布前不得存在失效导航、空锚点或未替换占位符。

## Review Focus

- 恶意或损坏历史字段不得通过 `innerHTML` 注入页面；由 Task 2 测试。
- 同一秒完成多次测试时历史 ID 仍唯一；由 Task 2 测试。
- 结果导出期间多次点击不得生成并发导出；由 Task 3 测试。
- 深色页面导出的 PNG 必须有明确固定背景；由 Task 3 浏览器检查。
- CDN 全部不可用时页面仍能显示文本、导航和测试结果；由 Task 4 检查。

---

### Task 1: 六维立场模拟器

**Files:**
- Modify: `simulator.html`
- Create: `assets/js/simulator.js`
- Create: `tests/simulator.test.mjs`
- Modify: `assets/css/pages.css`

**Interfaces:**
- Consumes: `PHILOSOPHY_TEST`、`calculateMatches()` 和结果图表接口。
- Produces: `createSimulationState(dimensions) -> Record<string, number>`、`updateSimulation(state, dimensionId, value) -> SimulationResult`。

- [ ] **Step 1: 写模拟状态失败测试**

断言六维默认 50、输入限制到 `0–100`、单轴更新不改变其他轴、匹配随状态实时重排。

- [ ] **Step 2: 运行并确认失败**

Run: `node --test tests/simulator.test.mjs`
Expected: FAIL。

- [ ] **Step 3: 实现滑块、实时雷达图和匹配列表**

每个滑块有可见标签、数值、两端说明和键盘支持；模拟结果不调用 `addHistory`。

- [ ] **Step 4: 运行测试并浏览器检查**

Run: `npm test`
Expected: PASS；拖动任一滑块后图表和匹配同步更新。

- [ ] **Step 5: 提交**

```bash
git add simulator.html assets/js/simulator.js assets/css/pages.css tests/simulator.test.mjs
git commit -m "feat: add philosophy stance simulator"
```

### Task 2: 本地历史页面

**Files:**
- Modify: `history.html`
- Create: `assets/js/history.js`
- Create: `tests/history.test.mjs`

**Interfaces:**
- Consumes: `createSiteStore().listHistory/removeHistory/clearHistory`。
- Produces: `toHistoryViewModel(record) -> SafeHistoryRecord`、`renderHistory(root, records)`。

- [ ] **Step 1: 写历史视图失败测试**

覆盖空状态、时间排序、重复时间戳的唯一 ID、非法字段过滤、文本转义、单条删除和清空确认。

- [ ] **Step 2: 运行并确认失败**

Run: `node --test tests/history.test.mjs`
Expected: FAIL。

- [ ] **Step 3: 实现安全渲染和删除交互**

仅通过 `textContent` 写入外部数据；清空全部前显示确认对话框；存储不可用时显示说明。

- [ ] **Step 4: 运行测试并浏览器检查**

Run: `npm test`
Expected: PASS；空历史、单条和多条记录均正确。

- [ ] **Step 5: 提交**

```bash
git add history.html assets/js/history.js tests/history.test.mjs
git commit -m "feat: add local test history"
```

### Task 3: 高清结果图片导出

**Files:**
- Create: `assets/js/export-image.js`
- Create: `tests/export-image.test.mjs`
- Modify: `assets/js/results.js`
- Modify: `assets/css/results.css`

**Interfaces:**
- Consumes: 已渲染结果 DOM、html2canvas-compatible 函数和下载 adapter。
- Produces: `exportResultImage(element, options) -> Promise<{ ok: boolean, error?: string }>`。

- [ ] **Step 1: 写导出失败测试**

断言 `scale >= 2`、固定背景、免责声明存在、文件名安全、并发点击去重、截图失败返回错误且恢复 DOM 状态。

- [ ] **Step 2: 运行并确认失败**

Run: `node --test tests/export-image.test.mjs`
Expected: FAIL。

- [ ] **Step 3: 实现导出与结果页按钮**

导出使用页面现有分数与文案，不调用计分函数；失败时显示打印／系统截图建议。

- [ ] **Step 4: 运行测试并检查浅深主题 PNG**

Run: `npm test`
Expected: PASS；两种主题导出图片均包含雷达图、分数、结果和固定免责声明。

- [ ] **Step 5: 提交**

```bash
git add assets/js/export-image.js assets/js/results.js assets/css/results.css tests/export-image.test.mjs
git commit -m "feat: export high resolution result images"
```

### Task 4: 全站集成、无障碍与降级验证

**Files:**
- Create: `tests/site-links.test.mjs`
- Create: `docs/qa/release-checklist.md`
- Modify: `README.md`
- Modify: 验证中发现问题的具体页面或资源文件

**Interfaces:**
- Consumes: 所有前序计划产物。
- Produces: 可静态部署的完整站点和发布检查记录。

- [ ] **Step 1: 写全站链接与占位符失败测试**

扫描全部 HTML 的本地链接和百科锚点；断言目标存在；扫描 `TODO/TBD/占位` 和失效空链接。

- [ ] **Step 2: 运行并修复结构问题**

Run: `npm test`
Expected: 修复前按实际缺陷 FAIL，修复后 PASS。

- [ ] **Step 3: 执行完整浏览器验收**

在 320px、768px、1440px 下完成五套测试，检查主题、键盘、恢复、历史、模拟器、百科和导出；分别阻止 Chart.js 与 html2canvas 请求验证降级。

- [ ] **Step 4: 完成发布文档和最终测试**

`README.md` 记录本地预览、目录说明、静态部署、隐私和 CDN 降级；`docs/qa/release-checklist.md` 记录每项验收结果。

Run: `npm test`
Expected: 全部 PASS，无 warning 未复核。

- [ ] **Step 5: 提交**

```bash
git add .
git commit -m "release: complete philosophy values site"
```

