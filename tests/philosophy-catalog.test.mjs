import test from 'node:test';
import assert from 'node:assert/strict';
import { PHILOSOPHY_TEST } from '../philosophy/definition.js';
import { auditCatalog } from './helpers/catalog-validator.mjs';

test('life philosophy catalog has 36 balanced questions across six axes', () => {
  const audit = auditCatalog(PHILOSOPHY_TEST, { questionCount: 36, forbidden: ['幼稚', '不成熟', '正确答案'] });
  assert.deepEqual(audit.errors, []);
  assert.deepEqual(audit.warnings, []);
  assert.equal(PHILOSOPHY_TEST.dimensions.length, 6);
  assert.deepEqual(PHILOSOPHY_TEST.ideologies.map((item) => item.name), ['存在主义', '虚无主义', '斯多葛主义', '实用主义', '本质主义', '理想主义', '荒诞主义', '伊壁鸠鲁主义', '人文主义', '享乐主义']);
  const expectedCoordinates = {
    absurdism: [82, 88, 58, 55, 72, 76],
    epicureanism: [48, 48, 22, 70, 56, 38],
    humanism: [72, 42, 82, 54, 82, 62],
    hedonism: [58, 66, 42, 86, 64, 55],
  };
  const axisIds = PHILOSOPHY_TEST.dimensions.map(({ id }) => id);
  for (const [id, coordinates] of Object.entries(expectedCoordinates)) {
    const ideology = PHILOSOPHY_TEST.ideologies.find((item) => item.id === id);
    assert.ok(ideology, `missing ${id}`);
    assert.deepEqual(axisIds.map((axisId) => ideology.scores[axisId]), coordinates);
  }
  assert.match(PHILOSOPHY_TEST.modelNote, /解释模型/);
});
