import test from 'node:test';
import assert from 'node:assert/strict';
import { buildResultViewModel } from '../assets/js/results.js';
import { readFile } from 'node:fs/promises';

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

test('primary match carries the plain-language explanation for direct display', () => {
  const matches = [{ id: 'nihilism', name: '虚无主义', match: 80, description: '质疑既定价值', lexiconId: 'nihilism' }];
  const model = buildResultViewModel(definition, { agency: 76 }, matches);
  assert.equal(model.primary.plain.say.length > 10, true);
  assert.equal(model.primary.plain.example.length > 10, true);
  assert.equal(model.primary.plain.claim.length > 10, true);
  assert.equal(model.primary.plain.confusion.length > 10, true);
});

test('lexicon base can be overridden for root-level result pages', () => {
  const matches = [
    { id: 'pragmatism', name: '实用主义', match: 82, description: '重视实践效果', lexiconId: 'pragmatism' },
    { id: 'stoicism', name: '斯多葛主义', match: 71, description: '重视可控行动', lexiconId: 'stoicism' },
    { id: 'idealism-x', name: '无名倾向', match: 60, description: '描述', lexiconId: 'not-in-lexicon' },
  ];
  const model = buildResultViewModel(definition, { agency: 76 }, matches, { lexiconBase: 'lexicon' });
  assert.equal(model.primary.lexiconHref, 'lexicon.html#pragmatism');
  assert.equal(model.related[0].lexiconHref, 'lexicon.html#stoicism');
  assert.equal(model.related[1].plain, null);
});

test('result renderer keeps report, export, disclaimer, and action hooks together', async () => {
  const source = await readFile(new URL('../assets/js/results.js', import.meta.url), 'utf8');
  ['data-result-capture', 'data-result-chart', 'data-export-result', 'data-restart-test', 'export-disclaimer']
    .forEach((hook) => assert.ok(source.includes(hook), `missing ${hook}`));
  assert.match(source, /模型匹配度/);
  assert.match(source, /阅读“/);
});
