// BOS guide gate -> Brevo contact (SOURCE_WORD=BOS) + Telegram ping with name, phone and their reason.
// Dependency-free CJS like intake.js / subscribe.js: package.json is .vercelignored, so Node builtins only.
// Env: BREVO_API_KEY, BREVO_LIST_ID (default 3), TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
// A lead counts as saved if EITHER Brevo or Telegram took it, so one outage never loses someone.

var SOURCES = { leamington: 1, linkedin: 1, instagram: 1, youtube: 1, tiktok: 1, direct: 1 };

function str(v, max) {
  if (typeof v !== 'string') return '';
  // collapse newlines/control chars so submitted text can't forge message lines
  return v.replace(/[\u0000-\u001f]+/g, ' ').replace(/ {2,}/g, ' ').trim().slice(0, max);
}

function json(res, code, body) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function readBody(req) {
  try {
    if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);
  } catch (e) { return Promise.resolve(null); }
  return new Promise(function (resolve) {
    var chunks = [];
    var size = 0;
    req.on('data', function (c) {
      size += c.length;
      if (size > 10000) { req.destroy(); resolve(null); return; }
      chunks.push(c);
    });
    req.on('end', function () {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch (e) { resolve(null); }
    });
    req.on('error', function () { resolve(null); });
  });
}

async function toBrevo(d) {
  var key = process.env.BREVO_API_KEY;
  if (!key) throw new Error('brevo env missing');
  var listId = parseInt(process.env.BREVO_LIST_ID || '3', 10);
  var r = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': key, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      email: d.email,
      listIds: [listId],
      updateEnabled: true,
      attributes: { FIRSTNAME: d.name, SOURCE_WORD: 'BOS', SOURCE_PLATFORM: d.source },
    }),
  });
  if (!r.ok) throw new Error('brevo ' + r.status + ' ' + (await r.text()).slice(0, 200));
}

async function toTelegram(d) {
  var token = process.env.TELEGRAM_BOT_TOKEN;
  var chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) throw new Error('telegram env missing');
  var text = '📘 BOS guide sign-up (' + d.source + ')\n' +
    'Name: ' + d.name + '\n' +
    'Email: ' + d.email + '\n' +
    'Phone: ' + (d.phone || '-') + '\n' +
    'Why: ' + d.why;
  var r = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text: text, disable_web_page_preview: true }),
  });
  if (!r.ok) throw new Error('telegram ' + r.status);
}

module.exports = async function (req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false });
  var ctype = String(req.headers['content-type'] || '');
  if (ctype.indexOf('application/json') === -1) return json(res, 415, { ok: false });
  var clen = parseInt(req.headers['content-length'] || '0', 10);
  if (clen > 10000) return json(res, 413, { ok: false });

  var b = await readBody(req);
  if (!b) return json(res, 400, { ok: false, error: 'Something went wrong, try again.' });

  // Honeypot filled -> pretend success, store nothing.
  if (str(b.website, 200)) return json(res, 200, { ok: true });

  var d = {
    name: str(b.name, 100),
    email: str(b.email, 200).toLowerCase(),
    phone: str(b.phone, 40),
    why: str(b.why, 1000),
    source: str(b.source, 20).toLowerCase(),
  };
  if (!SOURCES[d.source]) d.source = 'direct';
  if (!d.name) return json(res, 400, { ok: false, error: 'Pop your name in.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return json(res, 400, { ok: false, error: "That email doesn't look right." });
  if (d.phone && !/^[0-9+()\-. ]{6,40}$/.test(d.phone)) return json(res, 400, { ok: false, error: "That phone number doesn't look right." });
  if (d.why.length < 3) return json(res, 400, { ok: false, error: 'Tell me a bit about why you want it.' });

  var results = await Promise.allSettled([toBrevo(d), toTelegram(d)]);
  results.forEach(function (r) { if (r.status === 'rejected') console.error('bos: ' + r.reason); });
  if (results.every(function (r) { return r.status === 'rejected'; })) {
    return json(res, 502, { ok: false, error: 'Something went wrong on my side. Try again in a minute.' });
  }
  return json(res, 200, { ok: true });
};
