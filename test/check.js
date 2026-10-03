'use strict';
// Offline sanity checks: required files exist, local links/images resolve, and no old/secret data is left.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const pub = path.join(root, 'public');
let failed = 0;
const ok = (c, m) => { if (!c) { failed++; console.error('FAIL: ' + m); } else console.log('ok:   ' + m); };

const html = fs.readFileSync(path.join(pub, 'index.html'), 'utf8');
const all = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : all.push(p); } })(root);
const textFiles = all.filter(f => /\.(html|css|js|json|md|svg|txt)$/.test(f) && !f.includes('node_modules'));

// local references resolve
const refs = new Set();
html.replace(/(?:src|href|srcset|data-full)="(\/[^"#?]+)"/g, (_, u) => refs.add(u));
refs.forEach(u => ok(fs.existsSync(path.join(pub, u)), 'asset exists: ' + u));

// old person / old contact / web-dev positioning
const banned = [/subhan/i, /skdigital/i, /905825690921/, /istanbul/i, /web developer/i, /full-?stack/i, /web development/i, /\/api\/contact/, /nodemailer/i, /EMAIL_PASSWORD/];
textFiles.forEach(f => banned.forEach(b => { if (f.endsWith('check.js')) return; ok(!b.test(fs.readFileSync(f, 'utf8')), path.relative(root, f) + ' has no ' + b); }));

ok(html.includes('Muhammad Taha'), 'site is for Muhammad Taha');
ok(html.includes('action="https://formsubmit.co/mtahahussain1234@gmail.com"'), 'contact form posts to FormSubmit');
ok(/href="\/Muhammad-Taha-CV\.pdf"/.test(html), 'CV button points to local PDF');
ok(!/fetch\(/.test(fs.readFileSync(path.join(pub, 'js/main.js'), 'utf8')), 'no fetch/API calls in main.js');
ok(!/(password|secret|api[_-]?key|token)\s*[:=]/i.test(html + fs.readFileSync(path.join(pub, 'js/main.js'), 'utf8')), 'no secrets in frontend');
process.exit(failed ? 1 : 0);
