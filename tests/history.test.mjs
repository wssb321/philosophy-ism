import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { toHistoryViewModel, sortHistoryRecords, clearHistoryWithConfirmation } from '../assets/js/history.js';

test('history view model keeps only safe display fields', () => {
  const model = toHistoryViewModel({ id:'x', testId:'ethics', completedAt:10, resultName:'<img src=x onerror=alert(1)>', scores:{ 'consequence-duty':55, bad:'x' }, injected:'drop' });
  assert.deepEqual(Object.keys(model), ['id','testTitle','completedAt','resultName','scores','href']);
  assert.equal(model.resultName, '<img src=x onerror=alert(1)>');
  assert.deepEqual(model.scores, [{ id:'consequence-duty', label:'判断焦点', value:55 }]);
  assert.equal(model.href, 'results.html?record=x');
});

test('history view model builds a safe link back to the full result', () => {
  const model = toHistoryViewModel({ id:'a b/c?d', testId:'politics', completedAt:5, resultName:'古典自由主义', scores:{} });
  assert.equal(model.href, `results.html?record=${encodeURIComponent('a b/c?d')}`);
  assert.equal(toHistoryViewModel({ id:'', scores:{} }).href, '');
});

test('history sorts newest first while preserving duplicate timestamps', () => {
  const records = sortHistoryRecords([{id:'a',completedAt:2},{id:'b',completedAt:2},{id:'c',completedAt:3}]);
  assert.deepEqual(records.map(({id}) => id), ['c','a','b']);
});

test('clearing history requires confirmation', () => {
  let calls = 0;
  const store = { clearHistory(){ calls += 1; return {ok:true}; } };
  assert.equal(clearHistoryWithConfirmation(store, () => false).cancelled, true);
  assert.equal(calls, 0);
  assert.equal(clearHistoryWithConfirmation(store, () => true).ok, true);
  assert.equal(calls, 1);
});

test('history renderer never inserts record fields through innerHTML', async () => {
  const source = await readFile(new URL('../assets/js/history.js', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /innerHTML\s*=/);
  assert.match(source, /textContent\s*=/);
  assert.match(source, /history-card/);
  assert.match(source, /encodeURIComponent\(id\)/);
});
