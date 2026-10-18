import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LEXICON_ENTRIES } from '../assets/data/lexicon.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lexiconIds = new Set(LEXICON_ENTRIES.map(({ id }) => id));

async function htmlFiles(directory = ROOT) {
  const entries = await readdir(directory, { withFileTypes:true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.') || ['node_modules','docs'].includes(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    else if (extname(entry.name) === '.html') files.push(path);
  }
  return files;
}

async function targetFile(from, href) {
  const [pathname] = href.split('#');
  let target = resolve(dirname(from), pathname || from);
  try { if ((await stat(target)).isDirectory()) target = join(target, 'index.html'); } catch { /* asserted below */ }
  return target;
}

test('all local HTML links and media sources resolve and fragment targets exist', async () => {
  const problems = [];
  for (const file of await htmlFiles()) {
    const source = await readFile(file, 'utf8');
    for (const [, attribute, href] of source.matchAll(/(href|src)=["']([^"']*)["']/g)) {
      if (!href || /^(?:https?:|mailto:|tel:|data:|\/_vercel\/)/.test(href)) continue;
      const [pathname, fragment] = href.split('#');
      const target = await targetFile(file, href);
      try {
        const targetSource = await readFile(target, 'utf8');
        const dynamicLexiconAnchor = basename(target) === 'lexicon.html' && lexiconIds.has(fragment);
        if (attribute === 'href' && fragment && !dynamicLexiconAnchor && !new RegExp(`\\bid=["']${fragment.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}["']`).test(targetSource)) problems.push(`${file}: missing #${fragment} in ${target}`);
      } catch { problems.push(`${file}: missing ${pathname || target}`); }
    }
  }
  assert.deepEqual(problems, []);
});

test('published HTML contains no empty links or unfinished placeholders', async () => {
  const problems = [];
  for (const file of await htmlFiles()) {
    const source = await readFile(file, 'utf8');
    if (/href=["'](?:\s*|#)["']/.test(source)) problems.push(`${file}: empty link`);
    if (/\b(?:TODO|TBD)\b|正在构建中|占位内容/i.test(source)) problems.push(`${file}: unfinished content`);
  }
  assert.deepEqual(problems, []);
});
