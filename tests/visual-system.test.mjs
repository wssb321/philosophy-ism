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
  ['philosophy/index.html', 'lexicon.html', 'simulator.html'].forEach((href) => assert.match(html, new RegExp(`href="${href.replace('.', '\\.')}"`)));
  ['荒诞主义', '伊壁鸠鲁主义', '人文主义', '享乐主义'].forEach((name) => assert.match(html, new RegExp(name)));
});

test('editorial pages expose distinct readable layouts and keep their scripts', async () => {
  const [lexicon, quote, about] = await Promise.all(['lexicon.html', 'quote.html', 'about.html'].map(read));
  assert.match(lexicon, /<body class="lexicon-page">/);
  assert.match(lexicon, /class="container page-intro lexicon-intro"/);
  assert.match(lexicon, /class="container lexicon-toolbar"/);
  assert.match(lexicon, /assets\/js\/lexicon\.js/);
  assert.match(quote, /<body class="quote-page-shell">/);
  assert.match(quote, /class="quote-stage"/);
  assert.match(quote, /assets\/js\/quotes\.js/);
  assert.match(about, /<body class="about-page">/);
  assert.match(about, /class="container article-page"/);
  assert.match(about, /class="section-number"/);
});

test('lexicon and quote renderers expose editorial state hooks', async () => {
  const [lexiconSource, quoteSource] = await Promise.all([read('assets/js/lexicon.js'), read('assets/js/quotes.js')]);
  assert.match(lexiconSource, /entry-index/);
  assert.match(lexiconSource, /entry-header/);
  assert.match(lexiconSource, /entry-plain/);
  assert.match(quoteSource, /\[data-new-quote\]/);
  assert.match(quoteSource, /is-changing/);
});

test('tool pages expose the approved workbench and private archive shells', async () => {
  const [simulator, history] = await Promise.all(['simulator.html', 'history.html'].map(read));
  assert.match(simulator, /<body class="simulator-page">/);
  assert.match(simulator, /class="container simulator-workbench" data-simulator/);
  assert.match(simulator, /assets\/js\/simulator\.js/);
  assert.match(history, /<body class="history-page">/);
  assert.match(history, /class="container history-archive" data-history/);
  assert.match(history, /assets\/js\/history\.js/);
});

test('instant and historical results share the philosophy report structure', async () => {
  const [html, resultSource, historySource] = await Promise.all([
    read('results.html'), read('assets/js/results.js'), read('assets/js/history-result.js'),
  ]);
  assert.match(html, /<body class="result-history-page">/);
  assert.match(html, /data-result-root/);
  ['result-report', 'result-summary', 'result-grid', 'result-interpretation', 'related-results', 'result-actions']
    .forEach((hook) => assert.ok(resultSource.includes(hook), `missing ${hook}`));
  assert.match(historySource, /renderResults\(root, model\)/);
  assert.match(historySource, /history-result-back/);
});

test('responsive layers protect narrow screens, zoomed text, and reduced motion', async () => {
  const [base, components, pages, assessment, results] = await Promise.all([
    'assets/css/base.css', 'assets/css/components.css', 'assets/css/pages.css',
    'assets/css/test.css', 'assets/css/results.css',
  ].map(read));
  assert.match(base, /overflow-wrap:\s*anywhere/);
  assert.match(base, /prefers-reduced-motion/);
  [components, pages, assessment, results].forEach((css) => assert.match(css, /@media\s*\(max-width:/));
  assert.match(components, /min-height:\s*44px/);
});
