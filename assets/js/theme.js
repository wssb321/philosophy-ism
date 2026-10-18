const THEME_KEY = 'philosophy-site:theme';

export function getPreferredTheme(storage, prefersDark = false) {
  try {
    const stored = storage?.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {}
  return prefersDark ? 'dark' : 'light';
}

export function setTheme(theme, storage, root) {
  const normalized = theme === 'dark' ? 'dark' : 'light';
  root.dataset.theme = normalized;
  try {
    storage?.setItem(THEME_KEY, normalized);
    return true;
  } catch {
    return false;
  }
}

export function initTheme() {
  if (typeof document === 'undefined') return 'light';
  const prefersDark = globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  const theme = getPreferredTheme(globalThis.localStorage, prefersDark);
  setTheme(theme, globalThis.localStorage, document.documentElement);
  return theme;
}

