import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('all five assessments share the experience shell and keep unique themes', async () => {
  const ids = ['mindset', 'philosophy', 'metaphysics', 'politics', 'ethics'];
  for (const id of ids) {
    const html = await read(`${id}/index.html`);
    assert.match(html, new RegExp(`<body class="test-page test-${id}">`));
    assert.match(html, /assets\/css\/test\.css/);
    assert.match(html, /assets\/js\/site\.js/);
    assert.match(html, /src="app\.js"/);
    assert.match(html, /class="test-main test-experience" data-test-root/);
  }
});

test('assessment renderer exposes progress, accessible answers, keyboard help, and actions', async () => {
  const source = await read('assets/js/test-engine.js');
  ['test-progress', 'answer-option', 'test-actions', 'keyboard-hint', 'progress.answered']
    .forEach((hook) => assert.ok(source.includes(hook), `missing ${hook}`));
  assert.match(source, /aria-checked=/);
  assert.match(source, /type="radio"/);
  assert.match(source, /ANSWERS\.map/);
});

test('assessment app removes the previous keyboard listener before results or restart', async () => {
  const source = await read('assets/js/test-app.js');
  assert.match(source, /activeTest\?\.destroy\(\)/);
  assert.match(source, /activeTest\s*=\s*null/);
});
