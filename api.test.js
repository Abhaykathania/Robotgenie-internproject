const test = require('node:test');
const assert = require('node:assert');
const os = require('os');
const path = require('path');
const fs = require('fs');

process.env.DATA_FILE = path.relative(path.join(__dirname, '..'), path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'rg-')), 'enq.json'));
process.env.ENQUIRY_LIMIT = '3';
process.env.ADMIN_TOKEN = 'secret-token';
const { createServer } = require('../server');

let server, base;
test.before(async () => { server = createServer(); await new Promise((r) => server.listen(0, r)); base = `http://localhost:${server.address().port}`; });
test.after(() => server.close());

const post = (body) => fetch(base + '/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const good = { name: 'Asha Verma', phone: '9891707129', course: 'Finance' };

test('health and courses', async () => {
  assert.strictEqual((await fetch(base + '/api/health')).status, 200);
  const c = await (await fetch(base + '/api/courses')).json();
  assert.strictEqual(c.length, 6);
});
test('rejects invalid enquiry', async () => {
  const r = await post({ name: '', phone: '12', course: 'Nope' });
  assert.strictEqual(r.status, 422);
  assert.ok((await r.json()).errors.phone);
});
test('honeypot is ignored silently', async () => {
  const r = await post({ ...good, website: 'http://spam' });
  assert.strictEqual(r.status, 201);
});
test('stores valid enquiry and admin can read it', async () => {
  assert.strictEqual((await post(good)).status, 201);
  assert.strictEqual((await fetch(base + '/api/enquiries')).status, 401);
  const list = await (await fetch(base + '/api/enquiries', { headers: { Authorization: 'Bearer secret-token' } })).json();
  assert.strictEqual(list.length, 1);
  assert.strictEqual(list[0].name, 'Asha Verma');
});
test('rate limits repeated enquiries', async () => {
  let last;
  for (let i = 0; i < 4; i++) last = await post(good);
  assert.strictEqual(last.status, 429);
});
test('serves frontend and blocks path traversal', async () => {
  const home = await fetch(base + '/');
  assert.strictEqual(home.status, 200);
  assert.match(await home.text(), /Robot Genie/);
  const bad = await fetch(base + '/..%2fbackend%2f.env.example');
  assert.ok([403, 404].includes(bad.status));
  assert.strictEqual((await fetch(base + '/missing-page')).status, 404);
});
