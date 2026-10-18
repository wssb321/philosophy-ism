import test from 'node:test';
import assert from 'node:assert/strict';
import { createSiteStore } from '../assets/js/storage.js';

function memoryStorage(seed = {}) {
  const map = new Map(Object.entries(seed));
  return { getItem: (key) => map.get(key) ?? null, setItem: (key, value) => map.set(key, value), removeItem: (key) => map.delete(key) };
}

test('progress is restored only for the matching catalog version', () => {
  const store = createSiteStore(memoryStorage());
  assert.equal(store.saveProgress('mindset', 2, { index: 3, answers: { q1: 1 } }).ok, true);
  assert.deepEqual(store.loadProgress('mindset', 2), { index: 3, answers: { q1: 1 } });
  assert.equal(store.loadProgress('mindset', 1), null);
});

test('corrupt or unavailable storage falls back safely', () => {
  const corrupt = createSiteStore(memoryStorage({ 'philosophy-site:progress:mindset': '{bad' }));
  assert.equal(corrupt.loadProgress('mindset', 1), null);
  const blocked = createSiteStore({ getItem() { throw new Error('blocked'); }, setItem() { throw new Error('full'); } });
  assert.deepEqual(blocked.listHistory(), []);
  assert.equal(blocked.saveProgress('x', 1, {}).ok, false);
});

test('history keeps only approved fields and unique ids', () => {
  const store = createSiteStore(memoryStorage(), { now: () => 100, random: () => 0.5 });
  const one = store.addHistory({ id: 'same', testId: 'mindset', completedAt: 100, scores: { a: 50 }, resultName: '平衡型', secret: 'drop' });
  const two = store.addHistory({ id: 'same', testId: 'ethics', completedAt: 100, scores: { a: 60 }, resultName: '关怀伦理' });
  const history = store.listHistory();
  assert.equal(one.ok && two.ok, true);
  assert.equal(history.length, 2);
  assert.notEqual(history[0].id, history[1].id);
  assert.equal('secret' in history[0], false);
});

test('history supports single removal and clearing all records', () => {
  const store = createSiteStore(memoryStorage());
  store.addHistory({ id: 'a', testId: 'mindset', completedAt: 1, scores: {}, resultName: 'A' });
  store.addHistory({ id: 'b', testId: 'ethics', completedAt: 2, scores: {}, resultName: 'B' });
  assert.equal(store.removeHistory('a').ok, true);
  assert.deepEqual(store.listHistory().map((item) => item.id), ['b']);
  assert.equal(store.clearHistory().ok, true);
  assert.deepEqual(store.listHistory(), []);
});
