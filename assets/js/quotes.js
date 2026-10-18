import { QUOTES } from '../data/quotes.js';

export function pickQuote(quotes, randomValue = Math.random()) {
  if (!quotes.length) return null;
  return quotes[Math.min(quotes.length - 1, Math.floor(Math.max(0, randomValue) * quotes.length))];
}

if (typeof document !== 'undefined') {
  const text = document.querySelector('[data-quote-text]');
  const author = document.querySelector('[data-quote-author]');
  const source = document.querySelector('[data-quote-source]');
  const stage = document.querySelector('.quote-stage');
  const show = () => {
    const quote = pickQuote(QUOTES);
    stage?.classList.add('is-changing');
    text.textContent = `“${quote.text}”`;
    author.textContent = quote.author;
    source.textContent = quote.source;
    globalThis.requestAnimationFrame?.(() => stage?.classList.remove('is-changing'));
  };
  document.querySelector('[data-new-quote]')?.addEventListener('click', show);
  show();
}

