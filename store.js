// JSON-file storage with a write queue so concurrent requests never corrupt the file.
const fs = require('fs/promises');
const path = require('path');

const file = () => path.resolve(__dirname, '..', process.env.DATA_FILE || './data/enquiries.json');
let queue = Promise.resolve();

async function readAll() {
  try { return JSON.parse(await fs.readFile(file(), 'utf8')); }
  catch (e) { if (e.code === 'ENOENT') return []; throw e; }
}

function add(record) {
  const job = queue.catch(() => {}).then(async () => {
    const all = await readAll();
    all.push(record);
    await fs.mkdir(path.dirname(file()), { recursive: true });
    await fs.writeFile(file(), JSON.stringify(all, null, 2));
  });
  queue = job;
  return job;
}

module.exports = { add, readAll };
