import test from 'node:test';
import assert from 'node:assert/strict';
import { PHILOSOPHY_TEST } from '../philosophy/definition.js';
import { auditCatalog } from './helpers/catalog-validator.mjs';

test('life philosophy catalog has 36 balanced questions across six axes', () => {
  const audit = auditCatalog(PHILOSOPHY_TEST, { questionCount: 36, forbidden: ['幼稚', '不成熟', '正确答案'] });
  assert.deepEqual(audit.errors, []);
  assert.deepEqual(audit.warnings, []);
  assert.equal(PHILOSOPHY_TEST.dimensions.length, 6);
  assert.deepEqual(PHILOSOPHY_TEST.ideologies.map((item) => item.name), ['存在主义', '虚无主义', '斯多葛主义', '实用主义', '本质主义', '理想主义']);
  assert.match(PHILOSOPHY_TEST.modelNote, /解释模型/);
});
