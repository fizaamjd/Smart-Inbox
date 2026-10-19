import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { classifyEmail } from '../src/classify.js';
import { encrypt, decrypt } from '../src/crypto.js';
const originalFetch = globalThis.fetch;
const originalKey = process.env.GROQ_API_KEY;
afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.GROQ_API_KEY;
  else process.env.GROQ_API_KEY = originalKey;
});
function offline() {
  delete process.env.GROQ_API_KEY;
  globalThis.fetch = () => { throw new Error('Network forbidden in offline test'); };
}
test('missing model key routes urgent and lead keywords without network', async () => {
  offline();
  assert.equal(await classifyEmail(null, { subject: 'Critical outage' }), 'URGENT');
  assert.equal(await classifyEmail(null, { subject: 'Pricing quote request' }), 'LEAD');
});
test('unmatched message falls back to OTHER', async () => {
  offline();
  assert.equal(await classifyEmail(null, { subject: 'Hello there', body: 'A quiet afternoon' }), 'OTHER');
});
test('custom categories route keywords and preserve custom fallback', async () => {
  offline();
  const categories = [{ key: 'BILLING', keywords: ['invoice'] }, { key: 'OTHER', keywords: [] }];
  assert.equal(await classifyEmail({ categories }, { subject: 'Invoice for March' }), 'BILLING');
});
test('provider failure uses keyword fallback', async () => {
  process.env.GROQ_API_KEY = 'synthetic-key';
  globalThis.fetch = async () => { throw new Error('Synthetic outage'); };
  assert.equal(await classifyEmail(null, { subject: 'I need login help' }), 'SUPPORT');
});
test('valid model result is accepted using a mocked request only', async () => {
  process.env.GROQ_API_KEY = 'synthetic-key';
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://api.groq.com/openai/v1/chat/completions');
    assert.equal(options.method, 'POST');
    return Response.json({ choices: [{ message: { content: 'NEWSLETTER' } }] });
  };
  assert.equal(await classifyEmail(null, { subject: 'Weekly update' }), 'NEWSLETTER');
});
test('unknown model category cannot bypass configured category keys', async () => {
  process.env.GROQ_API_KEY = 'synthetic-key';
  globalThis.fetch = async () => Response.json({ choices: [{ message: { content: 'INVALID_LABEL' } }] });
  assert.equal(await classifyEmail(null, { subject: 'Critical outage' }), 'URGENT');
});
test('encryption round trip uses unique nonces', () => {
  const a = encrypt('synthetic-refresh-token');
  const b = encrypt('synthetic-refresh-token');
  assert.notEqual(a, b);
  assert.equal(decrypt(a), 'synthetic-refresh-token');
  assert.equal(decrypt(b), 'synthetic-refresh-token');
});
test('authenticated encryption rejects modified ciphertext', () => {
  const bytes = Buffer.from(encrypt('synthetic-refresh-token'), 'base64');
  bytes[bytes.length - 1] ^= 1;
  assert.throws(() => decrypt(bytes.toString('base64')));
});
test('empty credentials remain absent', () => {
  assert.equal(encrypt(''), null);
  assert.equal(encrypt(null), null);
  assert.equal(decrypt(''), null);
});
