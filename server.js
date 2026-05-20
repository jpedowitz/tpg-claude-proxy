const https = require('https');
const http  = require('http');

const PORT    = process.env.PORT || 3000;
const API_KEY = process.env.ANTHROPIC_API_KEY || '';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age':       '86400',
};

http.createServer((req, res) => {

  // Health check
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('TPG Claude Proxy OK');
    return;
  }

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    res.end();
    return;
  }

  // Only accept POST to /claude
  if (req.method !== 'POST' || req.url !== '/claude') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  // Read body
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {

    // Validate JSON
    let payload;
    try { payload = JSON.parse(body); }
    catch (e) {
      res.writeHead(400, { ...CORS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
      return;
    }

    // Forward to Anthropic
    const postData = Buffer.from(JSON.stringify(payload));
    const options = {
      hostname: 'api.anthropic.com',
      path:     '/v1/messages',
      method:   'POST',
      headers: {
        'x-api-key':         API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
        'content-length':    postData.length,
      },
    };

    const upstream = https.request(options, (upRes) => {
      let data = '';
      upRes.on('data', chunk => data += chunk);
      upRes.on('end', () => {
        res.writeHead(upRes.statusCode, {
          ...CORS,
          'Content-Type': 'application/json',
        });
        res.end(data);
      });
    });

    upstream.on('error', (err) => {
      res.writeHead(502, { ...CORS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Upstream error', detail: err.message }));
    });

    upstream.write(postData);
    upstream.end();
  });

}).listen(PORT, () => {
  console.log(`TPG Claude Proxy listening on port ${PORT}`);
});
