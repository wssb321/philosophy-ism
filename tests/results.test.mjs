import test from 'node:test';
import assert from 'node:assert/strict';
import { buildResultViewModel } from '../assets/js/results.js';

const definition = {
  title: '人生哲学测试',
  dimensions: [{ id: 'agency', name: '能动性', low: '外部条件', high: '个体能动', description: '如何理解行动空间' }],
};

test('result model exposes the primary match, alternatives, axes, and encyclopedia links', () => {
  const matches = [
    { id: 'pragmatism', name: '实用主义', match: 82, description: '重视实践效果', lexiconId: 'pragmatism' },
    { id: 'stoicism', name: '斯多葛主义', match: 71, description: '重视可控行动', lexiconId: 'stoicism' },
  ];
  const model = buildResultViewModel(definition, { agency: 76 }, matches);
  assert.equal(model.primary.name, '实用主义');
  assert.equal(model.primary.matchLabel, '模型匹配度 82%');
  assert.equal(model.related.length, 1);
  assert.deepEqual(model.dimensions[0], { id: 'agency', name: '能动性', low: '外部条件', high: '个体能动', description: '如何理解行动空间', score: 76 });
  assert.equal(model.primary.lexiconHref, '../lexicon.html#pragmatism');
  assert.doesNotMatch(JSON.stringify(model), /准确率/);
});

test('result model works without ideology matches for independent-axis tests', () => {
  const model = buildResultViewModel(definition, { agency: 50 }, []);
  assert.equal(model.primary, null);
  assert.equal(model.dimensions[0].score, 50);
});
