import test from 'node:test';
import assert from 'node:assert/strict';
import { LEXICON_ENTRIES, METAPHYSICS_NOTE } from '../assets/data/lexicon.js';
import { QUOTES } from '../assets/data/quotes.js';

const requiredTerms = [
  '形而上学', '唯物主义', '唯心主义', '理性主义', '经验主义', '自由意志论', '决定论', '一元论', '二元论', '本体论', '认识论',
  '存在主义', '虚无主义', '斯多葛主义', '实用主义', '本质主义', '理想主义',
  '共产主义', '资本主义', '民主社会主义', '社会民主主义', '古典自由主义', '自由意志主义', '保守主义', '无政府主义', '无政府共产主义',
  '功利主义', '义务论', '德性伦理学', '关怀伦理学',
  '规则任务导向（学生思维倾向）', '目标结果导向', '外部评价驱动', '内部自洽驱动', '风险规避', '试错思维', '线性思维', '系统思维',
];

test('the lexicon contains every required term with unique stable ids', () => {
  const names = new Set(LEXICON_ENTRIES.map((entry) => entry.name));
  requiredTerms.forEach((term) => assert.ok(names.has(term), `missing ${term}`));
  assert.equal(new Set(LEXICON_ENTRIES.map((entry) => entry.id)).size, LEXICON_ENTRIES.length);
});

test('the metaphysics note distinguishes the two definitions', () => {
  assert.match(METAPHYSICS_NOTE, /西方哲学本义/);
  assert.match(METAPHYSICS_NOTE, /孤立、静止、片面/);
  assert.match(METAPHYSICS_NOTE, /二者无关/);
});

test('quotes always identify an author and a source or translation status', () => {
  assert.ok(QUOTES.length >= 15);
  QUOTES.forEach((quote) => {
    assert.ok(quote.author);
    assert.ok(quote.source || quote.translation === '意译');
  });
});

