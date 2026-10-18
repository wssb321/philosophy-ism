import { createSiteStore } from './storage.js';
import { calculateMatches } from './scoring.js';
import { buildResultViewModel, renderResults } from './results.js';

const DEFINITION_MODULES = {
  mindset: { path: '../../mindset/definition.js', name: 'MINDSET_TEST' },
  philosophy: { path: '../../philosophy/definition.js', name: 'PHILOSOPHY_TEST' },
  metaphysics: { path: '../../metaphysics/definition.js', name: 'METAPHYSICS_TEST' },
  politics: { path: '../../politics/definition.js', name: 'POLITICS_TEST' },
  ethics: { path: '../../ethics/definition.js', name: 'ETHICS_TEST' },
};

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export async function loadDefinition(testId) {
  const target = DEFINITION_MODULES[testId];
  if (!target) return null;
  const module = await import(target.path);
  return module[target.name] ?? null;
}

export function resolveMatches(definition, scores) {
  return definition.resultMode === 'axes' ? [] : calculateMatches(scores, definition.ideologies);
}

export async function mountHistoryResult(root, store, params, location = globalThis.location) {
  const record = store.listHistory().find((item) => item.id === params.get('record'));
  const notice = element('section', 'container history-result-notice');

  if (!record) {
    notice.append(
      element('p', 'eyebrow', '历史结果'),
      element('h1', '', '没有找到这条记录'),
      element('p', '', '它可能已被删除，或属于另一个浏览器。历史记录只保存在创建它的设备上。'),
    );
    const back = element('a', 'button secondary', '返回历史记录');
    back.href = 'history.html';
    notice.append(back);
    root.replaceChildren(notice);
    return;
  }

  const definition = await loadDefinition(record.testId);
  if (!definition) {
    notice.append(
      element('p', 'eyebrow', '历史结果'),
      element('h1', '', '暂时无法显示这条记录'),
      element('p', '', '未识别的测试类型，无法重建结果页面。'),
    );
    const back = element('a', 'button secondary', '返回历史记录');
    back.href = 'history.html';
    notice.append(back);
    root.replaceChildren(notice);
    return;
  }

  const model = buildResultViewModel(definition, record.scores, resolveMatches(definition, record.scores), { lexiconBase: 'lexicon' });
  renderResults(root, model);

  const restart = root.querySelector('[data-restart-test]');
  if (restart) restart.addEventListener('click', () => { location.href = `${record.testId}/index.html`; });

  const backLink = element('a', 'history-result-back', '← 返回历史记录');
  backLink.href = 'history.html';
  root.querySelector('.result-actions').append(backLink);
}

if (typeof document !== 'undefined') {
  const root = document.querySelector('[data-result-root]');
  if (root) {
    mountHistoryResult(root, createSiteStore(globalThis.localStorage), new URLSearchParams(globalThis.location.search)).catch(() => {
      root.replaceChildren();
      const notice = element('section', 'container history-result-notice');
      notice.append(element('h1', '', '暂时无法显示这条记录'), element('p', '', '加载测试定义时出现问题，请稍后重试。'));
      const back = element('a', 'button secondary', '返回历史记录');
      back.href = 'history.html';
      notice.append(back);
      root.append(notice);
    });
  }
}
