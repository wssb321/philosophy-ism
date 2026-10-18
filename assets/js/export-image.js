const EXPORT_BACKGROUND = '#f7f4ee';
let activeExport = null;

export function safeExportFilename(value = 'philosophy-result') {
  const stem = String(value).trim()
    .replace(/[\\/:*?"<>|]+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/^[.\-]+|[.\-]+$/g, '')
    .replace(/-+/g, '-') || 'philosophy-result';
  return `${stem.replace(/\.png$/i, '')}.png`;
}

async function defaultDownload(canvas, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export function exportResultImage(element, options = {}) {
  if (activeExport) return activeExport;
  const run = async () => {
    if (!element?.querySelector?.('.export-disclaimer')) return { ok:false, error:'结果中缺少免责声明，无法导出。' };
    const capture = options.capture ?? globalThis.html2canvas;
    if (typeof capture !== 'function') return { ok:false, error:'图片组件未能加载。' };
    const previousBackground = element.style.backgroundColor;
    element.classList.add('export-mode');
    element.style.backgroundColor = EXPORT_BACKGROUND;
    try {
      const canvas = await capture(element, { scale:Math.max(2, Number(options.scale) || 2), backgroundColor:EXPORT_BACKGROUND, useCORS:true, logging:false });
      const download = options.download ?? defaultDownload;
      await download(canvas, safeExportFilename(options.filename));
      return { ok:true };
    } catch (error) {
      return { ok:false, error:error instanceof Error ? error.message : '图片生成失败' };
    } finally {
      element.classList.remove('export-mode');
      element.style.backgroundColor = previousBackground;
    }
  };
  activeExport = run().finally(() => { activeExport = null; });
  return activeExport;
}
