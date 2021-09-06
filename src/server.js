const { createServer: createHttpServer } = require('http');
const https = require('https');
const { parse } = require('url');
const { join } = require('path');
const next = require('next');
const fs = require('fs');
const sslRootCAs = require('ssl-root-cas/latest');
const cluster = require('./cluster');

const maxRAM = parseInt(process.env.MAX_OLD_SPACE_SIZE, 10) * 1024 * 1024;
const HTTPS = process.env.HTTPS;
const dev = process.env.NODE_ENV !== 'production';
const PORT = dev ? process.env.PORT || 3000 : process.env.PORT;

// For bad leaf cert
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

cluster(
  (worker) => {
    const isHeapReached = { value: false };

    worker.on('message', (d) => {
      if (d.event === 'memoryUsage') {
        const { heapUsed } = d.data;
        if (heapUsed > maxRAM) {
          isHeapReached.value = true;
        }
      }
    });

    sslRootCAs.inject();

    const app = next({ dev, dir: 'src' });
    const handle = app.getRequestHandler();

    let createServer;

    if (HTTPS) {
      createServer = (handler) => {
        createHttpServer((req, res) => {
          res.writeHead(301, {
            Location: 'https://' + req.headers['host'] + req.url,
          });
          res.end();
        }).listen(80);

        return https.createServer(
          {
            key: fs.readFileSync('/etc/access/keys/key.pem'),
            cert: fs.readFileSync('/etc/access/keys/cert.pem'),
            ca: fs.readFileSync('/etc/access/keys/ca.crt'),
          },
          handler,
        );
      };
    } else {
      createServer = createHttpServer;
    }

    const readyPromise = app.prepare();

    return createServer(async (req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      await readyPromise;

      if (pathname === '/service-worker.js') {
        const filePath = join(__dirname, '.next', pathname);
        await app.serveStatic(req, res, filePath);
      } else {
        await handle(req, res, parsedUrl);

        if (!isHeapReached.value) {
          // Ask master node for stats of memory usage for that worker
          // when limit is still not reached
          worker.send('memoryUsage');
        } else {
          // send quit to respawn worker when memory usage limit is reached
          worker.send('quit');
        }
      }
    }).listen(HTTPS ? PORT || 443 : PORT || 80, (err) => {
      if (err) throw err;
      console.log(
        `> Ready on http://localhost:${
          HTTPS ? PORT || 443 : PORT || 80
        }; PID: ${worker.process.pid}`,
      );
    });
  },
  {
    respawn: true,
    count: dev ? 2 : 0,
  },
);
