import test from 'node:test';
import assert from 'node:assert/strict';
import { getPreferredTheme, setTheme } from '../assets/js/theme.js';

test('stored light or dark theme overrides the system preference', () => {
  const storage = { getItem: () => 'light' };
  assert.equal(getPreferredTheme(storage, true), 'light');
});

test('invalid stored theme falls back to the system preference', () => {
  const storage = { getItem: () => 'sepia' };
  assert.equal(getPreferredTheme(storage, true), 'dark');
  assert.equal(getPreferredTheme(storage, false), 'light');
});

test('unavailable storage never prevents theme selection', () => {
  const storage = { getItem: () => { throw new Error('blocked'); } };
  assert.equal(getPreferredTheme(storage, true), 'dark');
});

test('setTheme updates the root even when persistence fails', () => {
  const root = { dataset: {} };
  const storage = { setItem: () => { throw new Error('full'); } };
  assert.equal(setTheme('dark', storage, root), false);
  assert.equal(root.dataset.theme, 'dark');
});
