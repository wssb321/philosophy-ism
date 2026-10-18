import test from 'node:test';
import assert from 'node:assert/strict';
import { ETHICS_TEST } from '../ethics/definition.js';
import { auditCatalog } from './helpers/catalog-validator.mjs';

test('ethics catalog has 40 low-risk thought experiments and four traditions', () => {
  const audit = auditCatalog(ETHICS_TEST, { questionCount: 40, forbidden: ['战争','死亡','伤害儿童','灾难现场','现实案件'] });
  assert.deepEqual(audit.errors, []);
  assert.deepEqual(audit.warnings, []);
  assert.equal(ETHICS_TEST.dimensions.length, 4);
  assert.deepEqual(ETHICS_TEST.ideologies.map((item) => item.name), ['功利主义','康德义务论','德性伦理学','关怀伦理学']);
});
