import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('shared visual tokens define paper, reading width, spacing, and motion', async () => {
  const css = await read('assets/css/base.css');
  ['--paper:', '--ink:', '--blue:', '--umber:', '--reading:', '--space-section:', '--motion-fast:']
    .forEach((token) => assert.match(css, new RegExp(token.replaceAll('-', '\\-')), `missing ${token}`));
  assert.match(css, /prefers-reduced-motion/);
});

test('shared components expose the editorial shell and interactive states', async () => {
  const css = await read('assets/css/components.css');
  ['.site-header', '.site-footer', '.page-intro', '.button.danger', '.form-control', '.status-message', '.nav-links[data-open="true"]']
    .forEach((selector) => assert.ok(css.includes(selector), `missing ${selector}`));
  assert.match(css, /:root\[data-theme="dark"\][^{]*\.site-header/);
  assert.match(css, /:focus-visible/);
});

test('site shell keeps six primary links, accessible controls, and disclaimer', async () => {
  const source = await read('assets/js/site.js');
  const navBlock = source.match(/const NAV_ITEMS = \[(.*?)\];/s)?.[1] ?? '';
  assert.equal((navBlock.match(/\['[^']+',\s*'[^']+'\]/g) ?? []).length, 6);
  assert.match(source, /aria-label="切换深浅主题"/);
  assert.match(source, /aria-controls="site-nav"/);
  assert.match(source, /本测试为趣味测评，无学术效力/);
});

test('homepage extends the approved hero with a ten-philosophy spectrum', async () => {
  const html = await read('index.html');
  assert.match(html, /class="philosophy-spectrum"/);
  assert.match(html, /十种人生哲学，一组思想坐标/);
  ['philosophy/', 'lexicon.html', 'simulator.html'].forEach((href) => assert.match(html, new RegExp(`href="${href.replace('.', '\\.')}"`)));
  ['荒诞主义', '伊壁鸠鲁主义', '人文主义', '享乐主义'].forEach((name) => assert.match(html, new RegExp(name)));
});
