import { LEXICON_CATEGORIES, LEXICON_ENTRIES } from '../data/lexicon.js';

export function filterEntries(entries, query = '', category = 'all') {
  const needle = query.trim().toLocaleLowerCase('zh-CN');
  return entries.filter((entry) => {
    const categoryMatches = category === 'all' || entry.category === category;
    const haystack = [entry.name, entry.definition, entry.claim, entry.distinction, ...Object.values(entry.plain ?? {}), ...(entry.keywords ?? [])].join(' ').toLocaleLowerCase('zh-CN');
    return categoryMatches && (!needle || haystack.includes(needle));
  });
}

function renderPlain(entry) {
  if (!entry.plain) return '';
  return `<details class="entry-plain"><summary>通俗版讲解</summary><p><strong>一句话说清：</strong>${entry.plain.say}</p><p><strong>举个例子：</strong>${entry.plain.example}</p><p><strong>它主张什么：</strong>${entry.plain.claim}</p><p><strong>容易和谁搞混：</strong>${entry.plain.confusion}</p></details>`;
}

function render(entries) {
  const list = document.querySelector('[data-lexicon-list]');
  const empty = document.querySelector('[data-lexicon-empty]');
  list.innerHTML = entries.map((entry, index) => `<article class="lexicon-entry" id="${entry.id}"><header class="entry-header"><span class="entry-index">${String(index + 1).padStart(2, '0')}</span><div><div class="entry-category">${entry.category}</div><h2>${entry.name}</h2></div></header><div class="entry-body"><p><strong>定义：</strong>${entry.definition}</p><p><strong>核心主张：</strong>${entry.claim}</p><p><strong>概念区分：</strong>${entry.distinction}</p>${renderPlain(entry)}</div></article>`).join('');
  empty.hidden = entries.length > 0;
}

if (typeof document !== 'undefined') {
  const input = document.querySelector('[data-lexicon-search]');
  const select = document.querySelector('[data-lexicon-category]');
  LEXICON_CATEGORIES.forEach((category) => select?.add(new Option(category, category)));
  const update = () => render(filterEntries(LEXICON_ENTRIES, input?.value, select?.value));
  input?.addEventListener('input', update);
  select?.addEventListener('change', update);
  update();
}

