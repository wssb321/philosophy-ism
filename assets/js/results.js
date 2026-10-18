import { exportResultImage } from './export-image.js';
import { PLAIN_ENTRIES } from '../data/lexicon.js';

const PLAIN_FIELDS = [
  ['say', '一句话说清'],
  ['example', '举个例子'],
  ['claim', '它主张什么'],
  ['confusion', '容易和谁搞混'],
];

function withLink(match, lexiconBase = '../lexicon') {
  return { ...match, matchLabel: `模型匹配度 ${Math.round(match.match)}%`, lexiconHref: match.lexiconId ? `${lexiconBase}.html#${match.lexiconId}` : `${lexiconBase}.html` };
}

function withPlain(match) {
  return { ...match, plain: match.lexiconId ? PLAIN_ENTRIES[match.lexiconId] ?? null : null };
}

export function buildResultViewModel(definition, scores, matches = [], options = {}) {
  const lexiconBase = options.lexiconBase ?? '../lexicon';
  return {
    testTitle: definition.title,
    primary: matches[0] ? withPlain(withLink(matches[0], lexiconBase)) : null,
    related: matches.slice(1, 4).map((match) => withPlain(withLink(match, lexiconBase))),
    dimensions: definition.dimensions.map((dimension) => ({ ...dimension, score: scores[dimension.id] })),
    disclaimer: '本测试为趣味测评，无学术效力',
  };
}

function dimensionRow(dimension) {
  return `<li class="score-row"><div><strong>${dimension.name}</strong><span>${dimension.low} ↔ ${dimension.high}</span></div><div class="score-bar" aria-hidden="true"><span style="width:${dimension.score}%"></span></div><b>${dimension.score}</b></li>`;
}

function plainList(plain) {
  if (!plain) return '';
  return `<ul class="result-plain">${PLAIN_FIELDS.map(([key, label]) => `<li><strong>${label}：</strong>${plain[key]}</li>`).join('')}</ul>`;
}

export function renderResults(root, model, chartFactory = globalThis.Chart) {
  const title = model.primary ? `你的综合倾向：${model.primary.name}` : '你的思想维度坐标';
  root.innerHTML = `<section class="result-page result-report"><div class="result-capture" data-result-capture><header class="result-heading result-summary"><p class="result-overline">思想画像报告 · ${model.testTitle}</p><h1>${title}</h1>${model.primary ? `<strong>${model.primary.matchLabel}</strong><p>${model.primary.description}</p>` : '<p>以下结果分别描述四个独立维度，不合并为唯一身份标签。</p>'}</header><div class="result-grid"><div class="chart-frame"><p class="report-index">01 · 坐标图谱</p><canvas data-result-chart aria-label="测评维度雷达图"></canvas><p class="chart-fallback" data-chart-fallback hidden>图表未能加载，下方文字分数仍为完整结果。</p></div><div class="dimension-results"><p class="report-index">02 · 维度得分</p><h2>你的思想坐标</h2><ul class="score-list">${model.dimensions.map(dimensionRow).join('')}</ul></div></div>${model.primary ? `<section class="result-copy result-interpretation"><p class="report-index">03 · 结果解读</p><h2>如何理解这个结果</h2><p>${model.primary.longDescription ?? model.primary.description}</p>${plainList(model.primary.plain)}<a class="result-lexicon-link" href="${model.primary.lexiconHref}">阅读“${model.primary.name}”百科词条 →</a></section>` : ''}${model.related.length ? `<section class="related-results"><p class="report-index">04 · 相近倾向</p><h2>思想从来不只有一个邻居</h2><ol>${model.related.map((item) => `<li><a href="${item.lexiconHref}"><strong>${item.name}</strong><span>${item.matchLabel}</span></a><p>${item.description}</p></li>`).join('')}</ol></section>` : ''}<p class="export-disclaimer">${model.disclaimer}</p></div><div class="result-actions"><button class="button umber" type="button" data-export-result>保存结果图片</button><button class="button secondary" type="button" data-restart-test>重新测试</button><p class="export-status" data-export-status role="status"></p></div></section>`;

  const canvas = root.querySelector('[data-result-chart]');
  const fallback = root.querySelector('[data-chart-fallback]');
  try {
    if (typeof chartFactory !== 'function') throw new Error('Chart unavailable');
    const config = {
      type: 'radar',
      data: { labels: model.dimensions.map((item) => item.name), datasets: [{ label: '维度得分', data: model.dimensions.map((item) => item.score), backgroundColor: 'rgba(49,91,121,.16)', borderColor: '#315b79', pointBackgroundColor: '#9a5735', borderWidth: 2 }] },
      options: { responsive: true, maintainAspectRatio: false, scales: { r: { min: 0, max: 100, beginAtZero: true, ticks: { stepSize: 20 } } }, plugins: { legend: { display: false } } },
    };
    new chartFactory(canvas, config);
  } catch {
    canvas.hidden = true;
    fallback.hidden = false;
  }

  const exportButton = root.querySelector('[data-export-result]');
  const exportStatus = root.querySelector('[data-export-status]');
  exportButton.addEventListener('click', async () => {
    exportButton.disabled = true;
    exportStatus.textContent = '正在生成高清图片…';
    const result = await exportResultImage(root.querySelector('[data-result-capture]'), { filename:`哲学主义-${model.primary?.name ?? '思想维度坐标'}` });
    exportButton.disabled = false;
    exportStatus.textContent = result.ok ? '图片已保存。' : `生成失败：${result.error} 可使用浏览器打印或系统截图保存。`;
  });
}

