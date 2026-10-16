'use strict';

const http = require('node:http');
const port = Number(process.env.PORT || 3000);

const server = http.createServer((request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname;

  if (path === '/healthz') {
    response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ status: 'ok', app: 'AttestGate demo app' }));
    return;
  }

  if (path === '/') {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>AttestGate demo app</title></head><body><main><h1>AttestGate demo app</h1><p>This image was built and signed by GitHub Actions. AttestGate checks its signature, SPDX SBOM, and build provenance before recording it as deployable.</p><p>Health endpoint: <code>/healthz</code></p></main></body></html>');
    return;
  }

  response.writeHead(404, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify({ error: 'not_found' }));
});

server.listen(port, '0.0.0.0', () => {
  console.log('demo app listening on ' + port);
});
