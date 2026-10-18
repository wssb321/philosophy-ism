import { initTheme, setTheme } from './theme.js';

const NAV_ITEMS = [
  ['index.html', '首页'],
  ['lexicon.html', '主义百科'],
  ['quote.html', '随机名言'],
  ['simulator.html', '立场模拟器'],
  ['history.html', '历史记录'],
  ['about.html', '关于网站'],
];

function getBasePath(pathname = '/') {
  const nested = ['/mindset/', '/philosophy/', '/metaphysics/', '/politics/', '/ethics/'];
  return nested.some((part) => pathname.includes(part)) ? '../' : '';
}

function currentFile(pathname = '/') {
  if (pathname.endsWith('/') || !pathname.split('/').pop().includes('.')) return 'index.html';
  return pathname.split('/').pop();
}

export function initSiteShell() {
  if (typeof document === 'undefined') return;
  const base = getBasePath(globalThis.location?.pathname);
  const current = currentFile(globalThis.location?.pathname);
  const links = NAV_ITEMS.map(([href, label]) => {
    const isCurrent = !base && href === current;
    return `<a href="${base}${href}"${isCurrent ? ' aria-current="page"' : ''}>${label}</a>`;
  }).join('');

  const header = document.createElement('header');
  header.className = 'site-header';
  header.dataset.siteShell = 'header';
  header.innerHTML = `<div class="container nav-wrap"><a class="brand" href="${base}index.html">哲学主义</a><nav class="nav-links" id="site-nav" aria-label="主导航">${links}</nav><button class="icon-button theme-button" type="button" aria-label="切换深浅主题" title="切换深浅主题"><span aria-hidden="true">◐</span></button><button class="icon-button menu-button" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="打开导航"><span aria-hidden="true">☰</span></button></div>`;
  document.body.prepend(header);

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.dataset.siteShell = 'footer';
  footer.innerHTML = `<div class="container footer-wrap"><div><a class="brand" href="${base}index.html">哲学主义</a><br><span>在思想中，遇见更清楚的自己。</span></div><div class="footer-links"><a href="${base}about.html#privacy">隐私</a><a href="${base}about.html#disclaimer">免责声明</a><span>本测试为趣味测评，无学术效力</span></div></div>`;
  document.body.append(footer);

  const menu = header.querySelector('.menu-button');
  const nav = header.querySelector('.nav-links');
  menu.addEventListener('click', () => {
    const open = nav.dataset.open !== 'true';
    nav.dataset.open = String(open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  });

  nav.addEventListener('click', (event) => {
    if (!event.target.closest('a')) return;
    nav.dataset.open = 'false';
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', '打开导航');
  });

  header.querySelector('.theme-button').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next, globalThis.localStorage, document.documentElement);
  });
}

if (typeof document !== 'undefined') {
  initTheme();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSiteShell, { once: true });
  else initSiteShell();
}

