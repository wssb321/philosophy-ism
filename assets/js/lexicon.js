import { LEXICON_CATEGORIES, LEXICON_ENTRIES } from '../data/lexicon.js';

export function filterEntries(entries, query = '', category = 'all') {
  const needle = query.trim().toLocaleLowerCase('zh-CN');
  return entries.filter((entry) => {
    const categoryMatches = category === 'all' || entry.category === category;
    const haystack = [entry.name, entry.definition, entry.claim, entry.distinction, ...(entry.keywords ?? [])].join(' ').toLocaleLowerCase('zh-CN');
    return categoryMatches && (!needle || haystack.includes(needle));
  });
}

function render(entries) {
  const list = document.querySelector('[data-lexicon-list]');
  const empty = document.querySelector('[data-lexicon-empty]');
  list.innerHTML = entries.map((entry) => `<article class="lexicon-entry" id="${entry.id}"><div class="entry-category">${entry.category}</div><h2>${entry.name}</h2><p><strong>定义：</strong>${entry.definition}</p><p><strong>核心主张：</strong>${entry.claim}</p><p><strong>概念区分：</strong>${entry.distinction}</p></article>`).join('');
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

