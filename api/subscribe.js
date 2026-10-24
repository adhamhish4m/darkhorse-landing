// Newsletter gate -> Brevo contact (list "Cleaning owners (newsletter)").
// Dependency-free CJS like intake.js: package.json is .vercelignored, so no imports beyond Node builtins.
// Env: BREVO_API_KEY (Contacts: All), BREVO_LIST_ID (default 3).

var WORDS = { INVOICE: 1, CREW: 1, CHECKIN: 1, QUOTE: 1, RFP: 1, GENERAL: 1 };
var PLATFORMS = { instagram: 1, youtube: 1, tiktok: 1, linkedin: 1, facebook: 1, direct: 1 };

function str(v, max) {
  if (typeof v !== 'string') return '';
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
      if (size > 5000) { req.destroy(); resolve(null); return; }
      chunks.push(c);
    });
    req.on('end', function () {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch (e) { resolve(null); }
    });
    req.on('error', function () { resolve(null); });
  });
}

module.exports = async function (req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false });
  var ctype = String(req.headers['content-type'] || '');
  if (ctype.indexOf('application/json') === -1) return json(res, 415, { ok: false });
  var clen = parseInt(req.headers['content-length'] || '0', 10);
  if (clen > 5000) return json(res, 413, { ok: false });

  var b = await readBody(req);
  if (!b) return json(res, 400, { ok: false, error: 'bad body' });

  // Honeypot filled -> pretend success, store nothing.
  if (str(b.website, 200)) return json(res, 200, { ok: true });

  var email = str(b.email, 200).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(res, 400, { ok: false, error: 'bad email' });

  var word = str(b.word, 20).toUpperCase();
  if (!WORDS[word]) word = 'GENERAL';
  var platform = str(b.platform, 20).toLowerCase();
  if (!PLATFORMS[platform]) platform = 'direct';

  var key = process.env.BREVO_API_KEY;
  var listId = parseInt(process.env.BREVO_LIST_ID || '3', 10);
  if (!key) { console.error('subscribe: BREVO_API_KEY missing'); return json(res, 500, { ok: false }); }

  var r = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': key, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      email: email,
      listIds: [listId],
      updateEnabled: true,
      attributes: { SOURCE_WORD: word, SOURCE_PLATFORM: platform },
    }),
  });
  if (!r.ok) {
    var detail = '';
    try { detail = (await r.text()).slice(0, 200); } catch (e) {}
    console.error('subscribe: brevo ' + r.status + ' ' + detail);
    return json(res, 502, { ok: false });
  }
  return json(res, 200, { ok: true });
};
