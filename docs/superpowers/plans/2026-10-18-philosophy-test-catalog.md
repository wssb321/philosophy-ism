# 哲学主义五套题库 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按统一 schema 完成五套中立中文题库、流派坐标、测试入口与内容校验。

**Architecture:** 每个测试目录使用相同的 `definition.js + index.html + app.js` 结构。定义文件只保存数据，页面通过上一阶段的公共引擎运行，统一验证器对题量、维度覆盖、ID、措辞和坐标进行检查。

**Tech Stack:** HTML5、JavaScript ES2022、Node.js `node:test`

**Spec:** `docs/superpowers/specs/2026-10-18-philosophy-values-site-design.md`

## Global Constraints

- 心智 30 题、人生哲学 36 题、形而上学 32 题、政治 40 题、伦理 40 题。
- 每道题至少关联一个有效维度，所有 ID 唯一。
- 政治题不得出现国家、政党、人物或现实事件。
- 心智题不得出现幼稚、不成熟等贬义判断。
- 结果页均需链接到百科稳定锚点。

## Review Focus

- 各轴正反方向题量严重失衡会造成默认偏置；由 Task 1 校验器测试。
- 题目重复或近义重复降低有效覆盖；由每个题库任务人工清单检查。
- 流派坐标缺失维度时必须阻止页面启动；由 Task 1 测试。
- 社会民主主义与民主社会主义说明不得互换；由 Task 4 内容断言。
- 形而上学四轴必须独立展示，不能输出唯一身份诊断；由 Task 3 浏览器检查。

---

### Task 1: 题库质量校验器

**Files:**
- Create: `tests/helpers/catalog-validator.mjs`
- Create: `tests/catalog-validator.test.mjs`

**Interfaces:**
- Consumes: 统一测试定义。
- Produces: `auditCatalog(definition, rules) -> { errors: string[], warnings: string[] }`。

- [ ] **Step 1: 写失败测试**

覆盖题量不符、ID 重复、维度未覆盖、单方向失衡、流派坐标不完整、禁用词和禁用实体命中。

- [ ] **Step 2: 运行并确认失败**

Run: `node --test tests/catalog-validator.test.mjs`
Expected: FAIL，校验器不存在。

- [ ] **Step 3: 实现校验器**

错误阻止发布；近义重复和每轴方向差异超过两题作为 warning，并由实现者人工复核。

- [ ] **Step 4: 运行并确认通过**

Run: `npm test`
Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add tests/helpers tests/catalog-validator.test.mjs
git commit -m "test: add philosophy catalog audits"
```

### Task 2: 心智认知与人生哲学测试

**Files:**
- Modify: `mindset/index.html`
- Create: `mindset/definition.js`
- Create: `mindset/app.js`
- Modify: `philosophy/index.html`
- Create: `philosophy/definition.js`
- Create: `philosophy/app.js`
- Create: `tests/mindset-catalog.test.mjs`
- Create: `tests/philosophy-catalog.test.mjs`

**Interfaces:**
- Consumes: 公共 `mountTest()`、结果接口和题库校验器。
- Produces: `MINDSET_TEST` 与 `PHILOSOPHY_TEST` 完整定义。

- [ ] **Step 1: 写题量、维度、类型和关键文案失败测试**

断言 30/36 题、4/6 轴、指定流派齐全；心智优势说明存在且禁用贬义词为零。

- [ ] **Step 2: 运行并确认失败**

Run: `node --test tests/mindset-catalog.test.mjs tests/philosophy-catalog.test.mjs`
Expected: FAIL，定义不存在。

- [ ] **Step 3: 编写两套题库、坐标和入口页面**

每轴题目覆盖两个方向并混合排列；人生哲学页面说明六轴是本站解释模型而非学术定论。

- [ ] **Step 4: 运行测试并人工完成两套测评**

Run: `npm test`
Expected: PASS；两套测试均可恢复和生成结果。

- [ ] **Step 5: 提交**

```bash
git add mindset philosophy tests
git commit -m "feat: add mindset and life philosophy tests"
```

### Task 3: 形而上学与认识论测试

**Files:**
- Modify: `metaphysics/index.html`
- Create: `metaphysics/definition.js`
- Create: `metaphysics/app.js`
- Create: `tests/metaphysics-catalog.test.mjs`

**Interfaces:**
- Consumes: 公共测评平台和校验器。
- Produces: `METAPHYSICS_TEST`，结果模式为四轴独立摘要。

- [ ] **Step 1: 写失败测试**

断言 32 题、4 轴、每轴至少 8 道主要题、双定义固定说明、结果配置不含唯一流派标签。

- [ ] **Step 2: 运行并确认失败**

Run: `node --test tests/metaphysics-catalog.test.mjs`
Expected: FAIL。

- [ ] **Step 3: 编写题库、维度解释和组合摘要**

组合摘要逐轴描述高侧、低侧或平衡，不计算跨领域的唯一主义身份。

- [ ] **Step 4: 运行测试并浏览器检查极端与中立答案**

Run: `npm test`
Expected: PASS；中立答案显示四轴平衡。

- [ ] **Step 5: 提交**

```bash
git add metaphysics tests/metaphysics-catalog.test.mjs
git commit -m "feat: add metaphysics and epistemology test"
```

### Task 4: 政治理念与道德伦理测试

**Files:**
- Modify: `politics/index.html`
- Create: `politics/definition.js`
- Create: `politics/app.js`
- Modify: `ethics/index.html`
- Create: `ethics/definition.js`
- Create: `ethics/app.js`
- Create: `tests/politics-catalog.test.mjs`
- Create: `tests/ethics-catalog.test.mjs`

**Interfaces:**
- Consumes: 公共测评平台和校验器。
- Produces: `POLITICS_TEST` 与 `ETHICS_TEST` 完整定义。

- [ ] **Step 1: 写题量、维度、流派和内容规则失败测试**

断言两套均 40 题；政治含 5 轴和 9 流派且无禁用实体；伦理含 4 轴和 4 流派；社民与民社说明包含规格中的制度差异。

- [ ] **Step 2: 运行并确认失败**

Run: `node --test tests/politics-catalog.test.mjs tests/ethics-catalog.test.mjs`
Expected: FAIL。

- [ ] **Step 3: 编写两套抽象、中立题库及流派坐标**

政治只描述制度原则与资源分配；伦理使用低风险思想实验，不写现实灾难、暴力细节或敏感群体。

- [ ] **Step 4: 运行测试并人工完成两套测评**

Run: `npm test`
Expected: PASS；结果和百科链接完整。

- [ ] **Step 5: 提交**

```bash
git add politics ethics tests
git commit -m "feat: add politics and ethics tests"
```

