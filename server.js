'use strict';
// Tiny static file server for local preview (no dependencies, no API).
const http = require('http');
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8'
};

function send(res, code, file) {
  const type = TYPES[path.extname(file)] || 'application/octet-stream';
  res.writeHead(code, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff' });
  fs.createReadStream(file).pipe(res);
}

http.createServer((req, res) => {
  let p;
  try { p = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch (e) { res.writeHead(400); return res.end('Bad request'); }
  if (p.endsWith('/')) p += 'index.html';
  const file = path.normalize(path.join(PUBLIC, p));
  if (!file.startsWith(PUBLIC + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file, (err, st) => {
    if (!err && st.isFile()) return send(res, 200, file);
    send(res, 404, path.join(PUBLIC, '404.html'));
  });
}).listen(PORT, () => console.log('Portfolio running at http://localhost:' + PORT));
