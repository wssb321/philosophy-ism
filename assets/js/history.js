import { createSiteStore } from './storage.js';

const TEST_TITLES = { mindset:'心智认知', philosophy:'人生哲学', metaphysics:'形而上学与认识论', politics:'政治理念', ethics:'道德伦理' };
const DIMENSION_LABELS = {
  'task-goal':'执行方式','external-internal':'评价来源','risk-trial':'不确定性','linear-system':'问题模型',
  'essence-create':'自我形成','objective-open':'意义来源','accept-transform':'处境态度','ideal-practical':'行动依据','condition-agency':'行动空间','stable-becoming':'自我连续性',
  'material-ideal':'实在基础','empirical-rational':'知识来源','free-determined':'行动因果','mono-dual':'心物结构',
  'collective-market':'经济所有','state-anarchy':'政治权威','equality-tradition':'社会秩序','collective-individual':'价值主体','ecology-growth':'发展目标',
  'consequence-duty':'判断焦点','welfare-rights':'价值范围','virtue-rule':'伦理中心','universal-care':'道德语境',
};

export function toHistoryViewModel(record) {
  const scores = Object.entries(record?.scores ?? {})
    .filter(([id, value]) => id in DIMENSION_LABELS && Number.isFinite(value))
    .map(([id, value]) => ({ id, label: DIMENSION_LABELS[id], value }));
  const id = String(record?.id ?? '');
  return {
    id,
    testTitle: TEST_TITLES[record?.testId] ?? '哲学测评',
    completedAt: Number(record?.completedAt) || 0,
    resultName: String(record?.resultName ?? '维度坐标'),
    scores,
    href: id ? `results.html?record=${encodeURIComponent(id)}` : '',
  };
}

export function sortHistoryRecords(records) {
  return records.map((record, index) => ({ record, index }))
    .sort((a, b) => (Number(b.record.completedAt) || 0) - (Number(a.record.completedAt) || 0) || a.index - b.index)
    .map(({ record }) => record);
}

export function clearHistoryWithConfirmation(store, confirmFn = globalThis.confirm) {
  if (!confirmFn('确定要清空全部本地测试记录吗？此操作无法撤销。')) return { cancelled:true };
  return store.clearHistory();
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function createHistoryCard(model) {
  const article = element('article', 'history-card');
  article.dataset.recordId = model.id;
  if (model.href) article.dataset.viewHref = model.href;
  const header = element('header', 'history-card-header');
  header.append(element('span', 'history-card-index', '记录'));
  const meta = element('div');
  const title = element('h2');
  if (model.href) {
    const titleLink = element('a', '', model.resultName);
    titleLink.href = model.href;
    title.append(titleLink);
  } else {
    title.textContent = model.resultName;
  }
  meta.append(element('p', 'eyebrow', model.testTitle), title);
  const time = element('time', '', new Intl.DateTimeFormat('zh-CN', { dateStyle:'medium', timeStyle:'short' }).format(new Date(model.completedAt)));
  time.dateTime = new Date(model.completedAt).toISOString();
  header.append(meta, time);
  const scores = element('ul', 'history-scores');
  for (const score of model.scores) {
    const item = element('li');
    item.append(element('span', '', score.label), element('strong', '', String(score.value)));
    scores.append(item);
  }
  article.append(header, scores);
  if (model.href) {
    const view = element('a', 'history-view', '查看完整结果 →');
    view.href = model.href;
    article.append(view);
  }
  const remove = element('button', 'history-remove', '删除这条记录');
  remove.type = 'button';
  remove.dataset.removeRecord = model.id;
  article.append(remove);
  return article;
}

export function renderHistory(root, records) {
  const models = sortHistoryRecords(records).map(toHistoryViewModel);
  const toolbar = element('div', 'history-toolbar');
  toolbar.setAttribute('aria-label', '历史记录工具栏');
  toolbar.append(element('p', '', models.length ? `共 ${models.length} 条本地记录` : '还没有测试记录'));
  if (models.length) {
    const clear = element('button', 'button secondary', '清空全部');
    clear.type = 'button';
    clear.dataset.clearHistory = '';
    toolbar.append(clear);
  }
  const list = element('div', 'history-list');
  if (models.length) models.forEach((model) => list.append(createHistoryCard(model)));
  else {
    const empty = element('section', 'history-empty');
    empty.append(element('h2', '', '你的思想轨迹会出现在这里'), element('p', '', '完成任意一套测试后，结果只会保存在当前浏览器。'));
    const start = element('a', 'button', '开始第一套测试');
    start.href = 'index.html#tests';
    empty.append(start);
    list.append(empty);
  }
  root.replaceChildren(toolbar, list);
}

function mountHistory(root) {
  const store = createSiteStore(globalThis.localStorage);
  const refresh = () => renderHistory(root, store.listHistory());
  root.addEventListener('click', (event) => {
    const remove = event.target.closest('[data-remove-record]');
    if (remove) { store.removeHistory(remove.dataset.removeRecord); refresh(); return; }
    const card = event.target.closest('[data-view-href]');
    if (card && !event.target.closest('a')) { globalThis.location.href = card.dataset.viewHref; return; }
    if (event.target.closest('[data-clear-history]')) {
      const result = clearHistoryWithConfirmation(store);
      if (result.ok) refresh();
    }
  });
  refresh();
}

if (typeof document !== 'undefined') {
  const root = document.querySelector('[data-history]');
  if (root) mountHistory(root);
}
