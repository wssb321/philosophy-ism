import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

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

test('all local HTML links resolve and fragment targets exist', async () => {
  const problems = [];
  for (const file of await htmlFiles()) {
    const source = await readFile(file, 'utf8');
    for (const [, href] of source.matchAll(/href=["']([^"']*)["']/g)) {
      if (!href || /^(?:https?:|mailto:|tel:|data:)/.test(href)) continue;
      const [pathname, fragment] = href.split('#');
      const target = await targetFile(file, href);
      try {
        const targetSource = await readFile(target, 'utf8');
        if (fragment && !new RegExp(`\\bid=["']${fragment.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}["']`).test(targetSource)) problems.push(`${file}: missing #${fragment} in ${target}`);
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
