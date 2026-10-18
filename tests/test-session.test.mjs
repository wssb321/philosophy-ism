import test from 'node:test';
import assert from 'node:assert/strict';
import { createTestSession } from '../assets/js/test-engine.js';

const definition = { questions: [{ id: 'q1' }, { id: 'q2' }, { id: 'q3' }] };

test('a fresh session starts at the first unanswered question', () => {
  const session = createTestSession(definition, {});
  assert.deepEqual(session.getProgress(), { index: 0, current: 1, total: 3, answered: 0 });
  assert.equal(session.isComplete(), false);
});

test('answering moves forward and previous allows replacing an answer', () => {
  const session = createTestSession(definition, {});
  session.answer(1);
  assert.equal(session.getProgress().index, 1);
  session.previous();
  session.answer(-2);
  assert.equal(session.getAnswers().q1, -2);
  assert.equal(session.getProgress().index, 1);
});

test('restored sessions resume at the first unanswered question', () => {
  const session = createTestSession(definition, { q1: 2, q2: 1 });
  assert.equal(session.getProgress().index, 2);
  session.answer(0);
  assert.equal(session.isComplete(), true);
});

test('navigation stays inside question bounds', () => {
  const session = createTestSession(definition, {});
  session.previous();
  assert.equal(session.getProgress().index, 0);
  session.next(); session.next(); session.next();
  assert.equal(session.getProgress().index, 2);
});

test('illegal answer values are rejected', () => {
  const session = createTestSession(definition, {});
  assert.throws(() => session.answer(9), /非法答案/);
});
