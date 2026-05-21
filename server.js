const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const PORT    = process.env.PORT || 3000;
const API_KEY = process.env.ANTHROPIC_API_KEY || '';

// Fail loudly at startup if key is missing
if (!API_KEY) {
  console.error('FATAL: ANTHROPIC_API_KEY environment variable is not set.');
  process.exit(1);
}

console.log('ANTHROPIC_API_KEY loaded:', API_KEY.slice(0,8) + '...');

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age':       '86400',
};

// Read module.js once at startup
let moduleJS = '';
try {
  moduleJS = fs.readFileSync(path.join(__dirname, 'module.js'), 'utf8');
  console.log('module.js loaded:', moduleJS.length, 'chars');
} catch(e) {
  console.warn('module.js not found:', e.message);
}

http.createServer((req, res) => {

  // Health check
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('TPG Claude Proxy OK — key loaded: ' + (API_KEY ? 'yes' : 'NO'));
    return;
  }

  // Serve module.js (handle cache-busting query strings)
  if (req.method === 'GET' && (req.url === '/module.js' || req.url.startsWith('/module.js?'))) {
    res.writeHead(200, { ...CORS, 'Content-Type': 'application/javascript', 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' });
    res.end(moduleJS);
    return;
  }

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    res.end();
    return;
  }

  // Claude proxy — POST /claude only
  if (req.method !== 'POST' || req.url !== '/claude') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {

    console.log('Proxying request, body length:', body.length);

    let payload;
    try { payload = JSON.parse(body); }
    catch (e) {
      console.error('JSON parse error:', e.message);
      res.writeHead(400, { ...CORS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
      return;
    }

    const postData = Buffer.from(JSON.stringify(payload));
    const options = {
      hostname: 'api.anthropic.com',
      path:     '/v1/messages',
      method:   'POST',
      timeout:  60000, // 60s timeout on upstream request
      headers: {
        'x-api-key':         API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
        'content-length':    postData.length,
      },
    };

    const upstream = https.request(options, (upRes) => {
      console.log('Anthropic status:', upRes.statusCode);
      let data = '';
      upRes.on('data', chunk => data += chunk);
      upRes.on('end', () => {
        console.log('Response length:', data.length);
        res.writeHead(upRes.statusCode, { ...CORS, 'Content-Type': 'application/json' });
        res.end(data);
      });
    });

    upstream.on('timeout', () => {
      console.error('Upstream request timed out');
      upstream.destroy();
      res.writeHead(504, { ...CORS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Upstream timeout' }));
    });

    upstream.on('error', (err) => {
      console.error('Upstream error:', err.message);
      if (!res.headersSent) {
        res.writeHead(502, { ...CORS, 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Upstream error', detail: err.message }));
      }
    });

    upstream.write(postData);
    upstream.end();
  });

}).listen(PORT, () => {
  console.log('TPG Claude Proxy listening on port', PORT);
});
