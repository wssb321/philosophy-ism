import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateDimensionScores, calculateMatches } from '../assets/js/scoring.js';

const definition = {
  dimensions: [{ id: 'a' }, { id: 'b' }],
  questions: [
    { id: 'q1', effects: { a: 1 } },
    { id: 'q2', effects: { a: -1, b: 1 } },
  ],
};

test('neutral answers map every dimension to 50', () => {
  assert.deepEqual(calculateDimensionScores(definition, { q1: 0, q2: 0 }), { a: 50, b: 50 });
});

test('positive and reverse weights normalize independently', () => {
  assert.deepEqual(calculateDimensionScores(definition, { q1: 2, q2: -2 }), { a: 100, b: 0 });
});

test('missing, unknown, or illegal answers are rejected', () => {
  assert.throws(() => calculateDimensionScores(definition, { q1: 2 }), /尚未完成/);
  assert.throws(() => calculateDimensionScores(definition, { q1: 2, q2: 3 }), /非法答案/);
  assert.throws(() => calculateDimensionScores(definition, { q1: 2, q2: 1, q9: 0 }), /未知题目/);
});

test('matches sort by normalized euclidean distance with stable ties', () => {
  const matches = calculateMatches(
    { a: 80, b: 20 },
    [
      { id: 'far', name: '远', scores: { a: 10, b: 90 } },
      { id: 'near', name: '近', scores: { a: 80, b: 20 } },
      { id: 'tie', name: '同距', scores: { a: 80, b: 20 } },
    ],
  );
  assert.deepEqual(matches.map((item) => item.id), ['near', 'tie', 'far']);
  assert.equal(matches[0].match, 100);
  assert.ok(matches[2].match >= 0 && matches[2].match <= 100);
});
