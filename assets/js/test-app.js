import { mountTest } from './test-engine.js';
import { calculateDimensionScores, calculateMatches } from './scoring.js';
import { buildResultViewModel, renderResults } from './results.js';
import { createSiteStore } from './storage.js';

export function startTestApp(definition) {
  const root = document.querySelector('[data-test-root]');
  const store = createSiteStore(globalThis.localStorage);
  const start = () => mountTest(root, definition, { store, onComplete: complete });
  const complete = (answers) => {
    const scores = calculateDimensionScores(definition, answers);
    const matches = definition.resultMode === 'axes' ? [] : calculateMatches(scores, definition.ideologies);
    const model = buildResultViewModel(definition, scores, matches);
    store.clearProgress(definition.id);
    store.addHistory({ testId: definition.id, completedAt: Date.now(), scores, resultName: matches[0]?.name ?? '维度坐标' });
    renderResults(root, model);
    root.querySelector('[data-restart-test]').addEventListener('click', start);
  };
  start();
}

