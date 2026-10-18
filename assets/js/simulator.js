import { calculateMatches } from './scoring.js';
import { PHILOSOPHY_TEST } from '../../philosophy/definition.js';

export function createSimulationState(dimensions) {
  return Object.fromEntries(dimensions.map(({ id }) => [id, 50]));
}

export function updateSimulation(state, dimensionId, value, ideologies = []) {
  if (!(dimensionId in state)) throw new TypeError(`未知维度：${dimensionId}`);
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) throw new TypeError(`非法分数：${value}`);
  const scores = { ...state, [dimensionId]: Math.max(0, Math.min(100, numeric)) };
  return { scores, matches: calculateMatches(scores, ideologies) };
}

function sliderMarkup(dimension) {
  return `<label class="simulator-control" for="sim-${dimension.id}"><span><strong>${dimension.name}</strong><output for="sim-${dimension.id}">50</output></span><span class="axis-ends"><i>${dimension.low}</i><i>${dimension.high}</i></span><input id="sim-${dimension.id}" type="range" min="0" max="100" step="1" value="50" data-dimension="${dimension.id}"></label>`;
}

function mountSimulator(root) {
  let state = createSimulationState(PHILOSOPHY_TEST.dimensions);
  root.innerHTML = `<div class="simulator-layout"><section class="simulator-panel" aria-labelledby="sim-controls-title"><h2 id="sim-controls-title">调整思想坐标</h2><p>拖动六条轴，观察与思想流派的距离如何变化。模拟结果不会写入测试历史。</p><div class="simulator-controls">${PHILOSOPHY_TEST.dimensions.map(sliderMarkup).join('')}</div></section><aside class="simulator-result" aria-live="polite"><div class="simulator-chart"><canvas aria-label="模拟思想坐标雷达图"></canvas><p data-chart-fallback hidden>图表未能加载，右侧匹配列表仍会实时更新。</p></div><div><p class="eyebrow">实时接近度</p><ol data-sim-matches class="simulator-matches"></ol></div></aside></div>`;

  const matchList = root.querySelector('[data-sim-matches]');
  const canvas = root.querySelector('canvas');
  const fallback = root.querySelector('[data-chart-fallback]');
  let chart = null;

  try {
    if (typeof globalThis.Chart !== 'function') throw new Error('Chart unavailable');
    chart = new globalThis.Chart(canvas, { type: 'radar', data: { labels: PHILOSOPHY_TEST.dimensions.map(({ name }) => name), datasets: [{ data: Object.values(state), backgroundColor: 'rgba(49,91,121,.16)', borderColor: '#315b79', pointBackgroundColor: '#9a5735', borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { r: { min: 0, max: 100, ticks: { stepSize: 20 } } }, plugins: { legend: { display: false } } } });
  } catch {
    canvas.hidden = true;
    fallback.hidden = false;
  }

  const render = () => {
    const matches = calculateMatches(state, PHILOSOPHY_TEST.ideologies).slice(0, 4);
    matchList.replaceChildren(...matches.map((match) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `lexicon.html#${match.lexiconId}`;
      const name = document.createElement('strong');
      name.textContent = match.name;
      const score = document.createElement('span');
      score.textContent = `${Math.round(match.match)}%`;
      link.append(name, score);
      item.append(link);
      return item;
    }));
    if (chart) {
      chart.data.datasets[0].data = PHILOSOPHY_TEST.dimensions.map(({ id }) => state[id]);
      chart.update();
    }
  };

  root.addEventListener('input', (event) => {
    const input = event.target.closest('[data-dimension]');
    if (!input) return;
    state = updateSimulation(state, input.dataset.dimension, input.value, PHILOSOPHY_TEST.ideologies).scores;
    input.closest('label').querySelector('output').textContent = input.value;
    render();
  });
  render();
}

if (typeof document !== 'undefined') {
  const root = document.querySelector('[data-simulator]');
  if (root) mountSimulator(root);
}
