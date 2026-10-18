import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

test('the project provides a dependency-free local launcher', async () => {
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(pkg.scripts.start, 'node tools/serve.mjs --open');
  await stat(new URL('../tools/serve.mjs', import.meta.url));
  const launcher = await readFile(new URL('../启动网站.cmd', import.meta.url), 'utf8');
  assert.match(launcher, /npm\s+start/i);
});

test('file protocol visitors receive a clear launch instruction', async () => {
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(homepage, /location\.protocol === 'file:'/);
  assert.match(homepage, /启动网站\.cmd/);
  assert.match(homepage, /local-file-warning/);
});
