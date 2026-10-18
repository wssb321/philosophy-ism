const PREFIX = 'philosophy-site';
const HISTORY_KEY = `${PREFIX}:history:v1`;

function safeParse(value, fallback) {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}

function sanitizeScores(scores) {
  return Object.fromEntries(Object.entries(scores ?? {}).filter(([, value]) => Number.isFinite(value)));
}

function sanitizeRecord(record) {
  return {
    id: String(record.id ?? ''),
    testId: String(record.testId ?? ''),
    completedAt: Number(record.completedAt) || 0,
    scores: sanitizeScores(record.scores),
    resultName: String(record.resultName ?? ''),
  };
}

export function createSiteStore(storage, options = {}) {
  const now = options.now ?? Date.now;
  const random = options.random ?? Math.random;
  const read = (key, fallback) => {
    try { return safeParse(storage?.getItem(key), fallback); } catch { return fallback; }
  };
  const write = (key, value) => {
    try { storage?.setItem(key, JSON.stringify(value)); return { ok: true }; }
    catch (error) { return { ok: false, error: error instanceof Error ? error.message : '存储不可用' }; }
  };
  const progressKey = (slug) => `${PREFIX}:progress:${slug}`;

  return {
    loadProgress(slug, version) {
      const payload = read(progressKey(slug), null);
      return payload?.version === version && payload.data && typeof payload.data === 'object' ? payload.data : null;
    },
    saveProgress(slug, version, data) { return write(progressKey(slug), { version, data }); },
    clearProgress(slug) {
      try { storage?.removeItem(progressKey(slug)); return { ok: true }; }
      catch (error) { return { ok: false, error: error instanceof Error ? error.message : '存储不可用' }; }
    },
    listHistory() {
      const records = read(HISTORY_KEY, []);
      if (!Array.isArray(records)) return [];
      return records.map(sanitizeRecord).sort((a, b) => b.completedAt - a.completedAt);
    },
    addHistory(record) {
      const records = this.listHistory();
      const clean = sanitizeRecord({ ...record, completedAt: record.completedAt ?? now() });
      const baseId = clean.id || `${clean.completedAt}-${Math.floor(random() * 1e9).toString(36)}`;
      let id = baseId;
      let suffix = 2;
      while (records.some((item) => item.id === id)) id = `${baseId}-${suffix++}`;
      clean.id = id;
      return write(HISTORY_KEY, [clean, ...records]);
    },
    removeHistory(id) { return write(HISTORY_KEY, this.listHistory().filter((item) => item.id !== id)); },
    clearHistory() { return write(HISTORY_KEY, []); },
  };
}

