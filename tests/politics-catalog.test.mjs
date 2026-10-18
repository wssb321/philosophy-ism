import test from 'node:test';
import assert from 'node:assert/strict';
import { POLITICS_TEST } from '../politics/definition.js';
import { auditCatalog } from './helpers/catalog-validator.mjs';

test('politics catalog has 40 abstract questions, five axes, and nine ideologies', () => {
  const audit = auditCatalog(POLITICS_TEST, { questionCount: 40, forbidden: ['中国','美国','苏联','共产党','民主党','共和党','总统','现实事件'] });
  assert.deepEqual(audit.errors, []);
  assert.deepEqual(audit.warnings, []);
  assert.equal(POLITICS_TEST.dimensions.length, 5);
  assert.equal(POLITICS_TEST.ideologies.length, 9);
  const socialDemocracy = POLITICS_TEST.ideologies.find((item) => item.id === 'social-democracy');
  const democraticSocialism = POLITICS_TEST.ideologies.find((item) => item.id === 'democratic-socialism');
  assert.match(socialDemocracy.description, /市场经济框架/);
  assert.match(democraticSocialism.description, /所有权与生产关系/);
});

