import test from 'node:test';
import assert from 'node:assert/strict';
import { MINDSET_TEST } from '../mindset/definition.js';
import { auditCatalog } from './helpers/catalog-validator.mjs';

test('mindset catalog has 30 balanced neutral questions and three profiles', () => {
  const audit = auditCatalog(MINDSET_TEST, { questionCount: 30, forbidden: ['幼稚', '不成熟', '低级'] });
  assert.deepEqual(audit.errors, []);
  assert.deepEqual(audit.warnings, []);
  assert.equal(MINDSET_TEST.dimensions.length, 4);
  assert.deepEqual(MINDSET_TEST.ideologies.map((item) => item.name), ['任务执行者', '自主行动者', '平衡型心智']);
  assert.match(MINDSET_TEST.notice, /正常认知偏好/);
  assert.match(MINDSET_TEST.notice, /优势/);
});

