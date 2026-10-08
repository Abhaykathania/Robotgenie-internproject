require('./src/env');
const http = require('http');
const crypto = require('crypto');
const courses = require('./data/courses.json');
const { validateEnquiry } = require('./src/validate');
const { allow } = require('./src/rateLimit');
const store = require('./src/store');
const { serveStatic } = require('./src/static');

const MAX_BODY = 10 * 1024;
const CSP = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'";

function send(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function clientIp(req) {
  if (process.env.TRUST_PROXY === 'true') {
    const f = req.headers['x-forwarded-for'];
    if (f) return String(f).split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) { reject(Object.assign(new Error('Payload too large'), { status: 413 })); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); }
      catch { reject(Object.assign(new Error('Invalid JSON'), { status: 400 })); }
    });
    req.on('error', reject);
  });
}

function notify(record) {
  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!url) return;
  fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: `New Robot Genie enquiry: ${record.name} (${record.phone}) for ${record.course}`, ...record }),
    signal: AbortSignal.timeout(5000),
  }).catch((e) => console.error('Webhook failed:', e.message));
}

function isAdmin(req) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const got = Buffer.from((req.headers.authorization || '').replace(/^Bearer\s+/i, ''));
  const want = Buffer.from(token);
  return got.length === want.length && crypto.timingSafeEqual(got, want);
}

async function api(req, res, pathname) {
  if (pathname === '/api/health' && req.method === 'GET') return send(res, 200, { status: 'ok', time: new Date().toISOString() });
  if (pathname === '/api/courses' && req.method === 'GET') return send(res, 200, courses);

  if (pathname === '/api/enquiry') {
    if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
    const body = await readJson(req);
    if (body.website) return send(res, 201, { ok: true }); // honeypot: pretend success to bots
    const max = Number(process.env.ENQUIRY_LIMIT || 5);
    const windowMs = Number(process.env.ENQUIRY_WINDOW_MINUTES || 15) * 60e3;
    if (!allow('enquiry:' + clientIp(req), max, windowMs)) return send(res, 429, { error: 'Too many requests. Please try again later.' });
    const { ok, errors, value } = validateEnquiry(body);
    if (!ok) return send(res, 422, { error: 'Validation failed', errors });
    const record = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...value };
    await store.add(record);
    notify(record);
    return send(res, 201, { ok: true, id: record.id });
  }

  if (pathname === '/api/enquiries' && req.method === 'GET') {
    if (!isAdmin(req)) return send(res, 401, { error: 'Unauthorized' });
    return send(res, 200, await store.readAll());
  }
  return send(res, 404, { error: 'Not found' });
}

function createServer() {
  return http.createServer(async (req, res) => {
    try {
      const { pathname } = new URL(req.url, 'http://localhost');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('Content-Security-Policy', CSP);

      const origin = req.headers.origin;
      const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
      if (origin && (allowed.includes('*') || allowed.includes(origin))) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      }
      if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

      if (pathname.startsWith('/api/')) return await api(req, res, pathname);
      if (process.env.SERVE_FRONTEND !== 'false' && (req.method === 'GET' || req.method === 'HEAD')) return serveStatic(req, res, pathname);
      return send(res, 404, { error: 'Not found' });
    } catch (e) {
      if (e.status) return send(res, e.status, { error: e.message });
      console.error(e);
      return send(res, 500, { error: 'Server error' });
    }
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  createServer().listen(port, () => console.log(`Robot Genie server running on http://localhost:${port}`));
}

module.exports = { createServer };
