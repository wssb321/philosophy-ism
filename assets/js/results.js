function withLink(match) {
  return { ...match, matchLabel: `模型匹配度 ${Math.round(match.match)}%`, lexiconHref: match.lexiconId ? `../lexicon.html#${match.lexiconId}` : '../lexicon.html' };
}

export function buildResultViewModel(definition, scores, matches = []) {
  return {
    testTitle: definition.title,
    primary: matches[0] ? withLink(matches[0]) : null,
    related: matches.slice(1, 4).map(withLink),
    dimensions: definition.dimensions.map((dimension) => ({ ...dimension, score: scores[dimension.id] })),
    disclaimer: '本测试为趣味测评，无学术效力',
  };
}

function dimensionRow(dimension) {
  return `<li class="score-row"><div><strong>${dimension.name}</strong><span>${dimension.low} ↔ ${dimension.high}</span></div><div class="score-bar" aria-hidden="true"><span style="width:${dimension.score}%"></span></div><b>${dimension.score}</b></li>`;
}

export function renderResults(root, model, chartFactory = globalThis.Chart) {
  const title = model.primary ? `你的综合倾向：${model.primary.name}` : '你的思想维度坐标';
  root.innerHTML = `<section class="result-page"><div class="result-capture" data-result-capture><header class="result-heading"><p>${model.testTitle}</p><h1>${title}</h1>${model.primary ? `<strong>${model.primary.matchLabel}</strong><p>${model.primary.description}</p>` : '<p>以下结果分别描述四个独立维度，不合并为唯一身份标签。</p>'}</header><div class="result-grid"><div class="chart-frame"><canvas data-result-chart aria-label="测评维度雷达图"></canvas><p class="chart-fallback" data-chart-fallback hidden>图表未能加载，下方文字分数仍为完整结果。</p></div><div><h2>维度得分</h2><ul class="score-list">${model.dimensions.map(dimensionRow).join('')}</ul></div></div>${model.primary ? `<section class="result-copy"><h2>结果解读</h2><p>${model.primary.longDescription ?? model.primary.description}</p><a href="${model.primary.lexiconHref}">阅读“${model.primary.name}”百科词条 →</a></section>` : ''}${model.related.length ? `<section class="related-results"><h2>相近的哲学倾向</h2><ol>${model.related.map((item) => `<li><a href="${item.lexiconHref}"><strong>${item.name}</strong><span>${item.matchLabel}</span></a><p>${item.description}</p></li>`).join('')}</ol></section>` : ''}<p class="export-disclaimer">${model.disclaimer}</p></div><div class="result-actions"><button class="button umber" type="button" data-export-result>保存结果图片</button><button class="button secondary" type="button" data-restart-test>重新测试</button></div></section>`;

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
}

