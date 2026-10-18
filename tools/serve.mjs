import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const ROOT = resolve(fileURLToPath(new URL('../', import.meta.url)));
const HOST = '127.0.0.1';
const PORT = Number(process.env.PHILOSOPHY_PORT) || 4173;
const ADDRESS = `http://${HOST}:${PORT}/`;
const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function openBrowser(url) {
  const commands = {
    win32: ['cmd.exe', ['/c', 'start', '', url]],
    darwin: ['open', [url]],
    linux: ['xdg-open', [url]],
  };
  const [command, args] = commands[process.platform] ?? commands.linux;
  const child = spawn(command, args, { detached: true, stdio: 'ignore', windowsHide: true });
  child.unref();
}

function requestFile(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relative = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '').replace(/\/$/, '/index.html');
  const candidate = resolve(ROOT, relative);
  return candidate === ROOT || candidate.startsWith(`${ROOT}${sep}`) ? candidate : null;
}

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? '/', ADDRESS).pathname;
  if (pathname === '/_vercel/insights/script.js') {
    response.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end('/* Vercel Analytics is enabled only after deployment. */');
    return;
  }

  let file = requestFile(pathname);
  if (!file) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  try {
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': MIME[extname(file).toLowerCase()] ?? 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('页面不存在');
  }
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE' && process.argv.includes('--open')) {
    console.log(`网站已经在运行：${ADDRESS}`);
    openBrowser(ADDRESS);
    process.exit(0);
  }
  console.error(error.message);
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  console.log(`哲学主义已启动：${ADDRESS}`);
  console.log('关闭此窗口即可停止本地网站。');
  if (process.argv.includes('--open')) openBrowser(ADDRESS);
});
