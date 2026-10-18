import test from 'node:test';
import assert from 'node:assert/strict';
import { filterEntries } from '../assets/js/lexicon.js';

const entries = [
  { name: '实用主义', category: '人生哲学', definition: '关注观念的实践效果', keywords: ['Pragmatism'] },
  { name: '经验主义', category: '形而上学与认识论', definition: '知识与经验相关', keywords: ['empiricism'] },
];

test('empty query and all category keep every entry', () => {
  assert.equal(filterEntries(entries, '   ', 'all').length, 2);
});

test('search ignores case and surrounding spaces across keywords', () => {
  assert.deepEqual(filterEntries(entries, ' PRAGMATISM ', 'all').map((entry) => entry.name), ['实用主义']);
});

test('query and category filters apply together', () => {
  assert.equal(filterEntries(entries, '经验', '人生哲学').length, 0);
  assert.equal(filterEntries(entries, '经验', '形而上学与认识论').length, 1);
});
