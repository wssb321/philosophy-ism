import test from 'node:test';
import assert from 'node:assert/strict';
import { METAPHYSICS_TEST } from '../metaphysics/definition.js';
import { auditCatalog } from './helpers/catalog-validator.mjs';

test('metaphysics catalog has 32 questions and reports four independent axes', () => {
  const audit = auditCatalog(METAPHYSICS_TEST, { questionCount: 32, forbidden: ['孤立地看问题', '正确答案'] });
  assert.deepEqual(audit.errors, []);
  assert.deepEqual(audit.warnings, []);
  assert.equal(METAPHYSICS_TEST.dimensions.length, 4);
  METAPHYSICS_TEST.dimensions.forEach((axis) => assert.equal(METAPHYSICS_TEST.questions.filter((q) => axis.id in q.effects).length, 8));
  assert.equal(METAPHYSICS_TEST.resultMode, 'axes');
  assert.equal(METAPHYSICS_TEST.ideologies.length, 0);
  assert.match(METAPHYSICS_TEST.notice, /西方哲学本义/);
  assert.match(METAPHYSICS_TEST.notice, /二者无关/);
});
