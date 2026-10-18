import test from 'node:test';
import assert from 'node:assert/strict';
import { validateTestDefinition } from '../assets/js/test-schema.js';

const valid = {
  id: 'sample', version: 1,
  dimensions: [{ id: 'axis', low: '低', high: '高' }],
  questions: [{ id: 'q1', text: '示例', effects: { axis: 1 } }],
  ideologies: [{ id: 'i1', name: '示例', scores: { axis: 50 } }],
};

test('valid definitions produce no errors', () => assert.deepEqual(validateTestDefinition(valid), []));

test('duplicate ids and unknown dimensions are rejected', () => {
  const broken = structuredClone(valid);
  broken.questions.push({ id: 'q1', text: '重复', effects: { missing: 1 } });
  const errors = validateTestDefinition(broken).join(' ');
  assert.match(errors, /题目 ID 重复/);
  assert.match(errors, /未知维度/);
});

test('invalid weights and incomplete ideology coordinates are rejected', () => {
  const broken = structuredClone(valid);
  broken.questions[0].effects.axis = 0;
  broken.ideologies[0].scores = {};
  const errors = validateTestDefinition(broken).join(' ');
  assert.match(errors, /权重/);
  assert.match(errors, /缺少维度/);
});

