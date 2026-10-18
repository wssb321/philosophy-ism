import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';

const requiredFiles = [
  'index.html',
  'lexicon.html',
  'quote.html',
  'simulator.html',
  'history.html',
  'results.html',
  'about.html',
  'mindset/index.html',
  'philosophy/index.html',
  'metaphysics/index.html',
  'politics/index.html',
  'ethics/index.html',
  'assets/css/base.css',
  'assets/js/site.js',
];

test('the static site exposes every planned entry point', async () => {
  await Promise.all(requiredFiles.map((file) => access(file)));
  assert.equal(requiredFiles.length, 14);
});
