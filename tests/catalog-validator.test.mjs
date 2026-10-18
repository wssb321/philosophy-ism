import test from 'node:test';
import assert from 'node:assert/strict';
import { auditCatalog } from './helpers/catalog-validator.mjs';

const good = {
  dimensions: [{ id: 'a' }],
  questions: [
    { id: 'q1', text: '正向陈述', effects: { a: 1 } },
    { id: 'q2', text: '反向陈述', effects: { a: -1 } },
  ],
  ideologies: [{ id: 'i', scores: { a: 50 } }],
};

test('a balanced complete catalog passes', () => {
  assert.deepEqual(auditCatalog(good, { questionCount: 2, forbidden: [] }), { errors: [], warnings: [] });
});

test('count, duplicate ids, coverage, coordinates, and forbidden terms are errors', () => {
  const broken = structuredClone(good);
  broken.dimensions.push({ id: 'b' });
  broken.questions[1] = { id: 'q1', text: '包含禁词', effects: { a: 1 } };
  const result = auditCatalog(broken, { questionCount: 3, forbidden: ['禁词'] });
  const errors = result.errors.join(' ');
  assert.match(errors, /题量/);
  assert.match(errors, /重复/);
  assert.match(errors, /维度 b/);
  assert.match(errors, /坐标/);
  assert.match(errors, /禁用词/);
});

test('direction differences greater than two produce a warning', () => {
  const catalog = structuredClone(good);
  catalog.questions.push({ id: 'q3', text: '正向二', effects: { a: 1 } }, { id: 'q4', text: '正向三', effects: { a: 1 } }, { id: 'q5', text: '正向四', effects: { a: 1 } });
  const result = auditCatalog(catalog, { questionCount: 5, forbidden: [] });
  assert.match(result.warnings.join(' '), /方向题量差异/);
});
