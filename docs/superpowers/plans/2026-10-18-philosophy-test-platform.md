# 哲学主义测评平台 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现五套测评共用的定义校验、计分、流派匹配、答题流程、结果展示和版本化本地存储。

**Architecture:** 计分和存储保持为无 DOM 的纯模块，浏览器界面通过 `test-engine.js` 组合这些接口。测试定义使用统一 schema，使后续题库只提供数据而不重复流程代码。

**Tech Stack:** JavaScript ES2022、Node.js `node:test`、Chart.js CDN

**Spec:** `docs/superpowers/specs/2026-10-18-philosophy-values-site-design.md`

## Global Constraints

- 五档答案固定为 `-2/-1/0/1/2`。
- 标准化维度分数必须限制在 `0–100`，`50` 表示相对平衡。
- 匹配分数称为“模型匹配度”，不能称为准确率或概率。
- 未完成全部题目时不得生成正式结果。
- 图表失败时仍必须显示文字分数。

## Review Focus

- 所有答案为 0 时每个维度返回 50；由 Task 1 测试。
- 反向权重和多维题目同时存在时不会重复归一化；由 Task 1 测试。
- 答案含未知题目或非法分值时拒绝计分；由 Task 1 测试。
- 本地存储满额或禁用时当前会话仍可继续；由 Task 2 测试。
- Chart.js 未加载时结果文字和匹配列表仍完整；由 Task 4 浏览器检查。

---

### Task 1: 测试定义、计分和匹配

**Files:**
- Create: `assets/js/scoring.js`
- Create: `assets/js/test-schema.js`
- Create: `tests/scoring.test.mjs`
- Create: `tests/schema.test.mjs`

**Interfaces:**
- Consumes: `{ dimensions, questions, ideologies }` 测试定义和 `{ [questionId]: -2|-1|0|1|2 }` 答案。
- Produces: `validateTestDefinition(definition) -> string[]`、`calculateDimensionScores(definition, answers) -> Record<string, number>`、`calculateMatches(scores, ideologies) -> Match[]`。

- [ ] **Step 1: 写 schema 与计分失败测试**

覆盖重复 ID、未知维度、非法权重、缺失答案、非法答案、全中立、两个极端方向、反向权重、多维题目和匹配排序。

- [ ] **Step 2: 运行测试并确认失败**

Run: `node --test tests/schema.test.mjs tests/scoring.test.mjs`
Expected: FAIL，模块不存在。

- [ ] **Step 3: 实现三个公共接口**

`calculateDimensionScores` 在校验通过且答案完整时返回一位小数的 `0–100` 分数，否则抛出带可读消息的 `TypeError`；匹配数组按分数降序且保持稳定次序。

- [ ] **Step 4: 运行测试并确认通过**

Run: `npm test`
Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add assets/js/scoring.js assets/js/test-schema.js tests
git commit -m "feat: add shared scoring model"
```

### Task 2: 版本化本地存储

**Files:**
- Create: `assets/js/storage.js`
- Create: `tests/storage.test.mjs`

**Interfaces:**
- Consumes: Storage-compatible adapter、测试 slug、题库版本和 JSON-safe 数据。
- Produces: `createSiteStore(storage) -> { loadProgress, saveProgress, clearProgress, listHistory, addHistory, removeHistory, clearHistory }`。

- [ ] **Step 1: 写存储失败测试**

覆盖正常读写、版本不匹配、损坏 JSON、不可用 storage、重复历史 ID、单条删除和全部清空。

- [ ] **Step 2: 运行测试并确认失败**

Run: `node --test tests/storage.test.mjs`
Expected: FAIL，存储模块不存在。

- [ ] **Step 3: 实现容错存储接口**

所有写入方法返回 `{ ok: boolean, error?: string }`，读取失败返回安全空值而不抛出；历史记录只允许规格列出的字段。

- [ ] **Step 4: 运行测试并确认通过**

Run: `npm test`
Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add assets/js/storage.js tests/storage.test.mjs
git commit -m "feat: add versioned local result storage"
```

### Task 3: 通用答题界面

**Files:**
- Create: `assets/js/test-engine.js`
- Create: `assets/css/test.css`
- Create: `tests/test-session.test.mjs`

**Interfaces:**
- Consumes: Task 1 的测试定义与 Task 2 的 store。
- Produces: `createTestSession(definition, initialAnswers) -> Session`、`mountTest(root, definition, options)`；Session 提供 `answer`、`previous`、`next`、`getProgress`、`isComplete`。

- [ ] **Step 1: 写会话状态失败测试**

覆盖初始状态、答题前进、返回改答、刷新恢复、越界导航和未完成保护。

- [ ] **Step 2: 运行测试并确认失败**

Run: `node --test tests/test-session.test.mjs`
Expected: FAIL，接口不存在。

- [ ] **Step 3: 实现会话与 DOM 渲染**

渲染单题卡片、五档选择、进度、上一题、退出和数字键快捷操作；保存失败只显示非阻塞提示。

- [ ] **Step 4: 运行测试并确认通过**

Run: `npm test`
Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add assets/js/test-engine.js assets/css/test.css tests/test-session.test.mjs
git commit -m "feat: add reusable test session UI"
```

### Task 4: 通用结果页与图表降级

**Files:**
- Create: `assets/js/results.js`
- Create: `assets/css/results.css`
- Create: `tests/results.test.mjs`

**Interfaces:**
- Consumes: Task 1 的维度得分和 Match[]、测试定义、可选 Chart 构造器。
- Produces: `buildResultViewModel(definition, scores, matches) -> ResultViewModel`、`renderResults(root, model, chartFactory?)`。

- [ ] **Step 1: 写结果模型失败测试**

断言主要流派、其他匹配、维度两端说明、百科链接和“模型匹配度”文案正确；不得出现“准确率”。

- [ ] **Step 2: 运行测试并确认失败**

Run: `node --test tests/results.test.mjs`
Expected: FAIL，结果模块不存在。

- [ ] **Step 3: 实现结果模型、雷达图和文字降级**

始终先渲染文字分数，再尝试创建图表；图表异常只隐藏画布并显示提示。

- [ ] **Step 4: 运行测试并执行浏览器降级检查**

Run: `npm test`
Expected: PASS；阻止 Chart.js 请求后仍可阅读全部结果。

- [ ] **Step 5: 提交**

```bash
git add assets/js/results.js assets/css/results.css tests/results.test.mjs
git commit -m "feat: add accessible result rendering"
```

