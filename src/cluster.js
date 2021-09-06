const cluster = require('cluster');
const os = require('os');

const worker = async (fn, worker) => {
  let server;
  server = await fn(worker);
  if (!server) {
    return;
  }
  if (typeof server.on === 'function') {
    server.on('close', () => {
      return process.exit();
    });
  }
  if (typeof server.close === 'function') {
    return process.on('message', (msg) => {
      if (msg === 'quit') {
        return server.close();
      }
    });
  }
};

const master = (config) => {
  var count, i, j, outputStream, ref, respawn, worker, workerCount, workers;
  count = parseInt(config.count || process.env.WORKER_COUNT);
  workerCount = count > 0 ? count : os.cpus().length;
  respawn =
    typeof config.respawn === 'undefined' ? true : Boolean(config.respawn);
  outputStream =
    config.outputStream && typeof config.outputStream.write === 'function'
      ? config.outputStream.write
      : console.log;
  workers = [];
  if (config.verbose) {
    outputStream(
      'Master started on pid ' +
        process.pid +
        ', forking ' +
        workerCount +
        ' processes',
    );
  }
  for (
    i = j = 0, ref = workerCount;
    0 <= ref ? j < ref : j > ref;
    i = 0 <= ref ? ++j : --j
  ) {
    worker = cluster.fork();
    if (typeof config.workerListener === 'function') {
      worker.on('message', config.workerListener);
    }
    workers.push(worker);
  }
  cluster.on('exit', (worker, code, signal) => {
    let idx;
    if (config.verbose) {
      outputStream(
        worker.process.pid +
          ' died with ' +
          (signal || 'exit code ' + code) +
          (respawn ? ', restarting' : ''),
      );
    }
    idx = workers.indexOf(worker);
    if (idx > -1) {
      workers.splice(idx, 1);
    }
    if (respawn) {
      worker = cluster.fork();
      if (typeof config.workerListener === 'function') {
        worker.on('message', config.workerListener);
      }
      return workers.push(worker);
    }
  });

  process.on('message', function(msg) {
    if (msg == 'memoryUsage') {
      process.send({
        event: msg,
        data: process.memoryUsage(),
      });
    }
  });

  return process.on('SIGQUIT', () => {
    var k, len, results;
    respawn = false;
    if (config.verbose) {
      outputStream(
        'QUIT received, will exit once all workers have finished current requests',
      );
    }
    results = [];
    for (k = 0, len = workers.length; k < len; k++) {
      worker = workers[k];
      results.push(worker.send('quit'));
    }
    return results;
  });
};

module.exports = (arg0, arg1) => {
  let config = {},
    fn = () => {};

  if (typeof arg0 === 'function') {
    fn = arg0;
    config = arg1 || config;
  } else if (typeof arg1 === 'function') {
    fn = arg1;
    config = arg0 || config;
  }

  if (cluster.isMaster) {
    return master(config);
  } else {
    return worker(fn, cluster.worker);
  }
};
