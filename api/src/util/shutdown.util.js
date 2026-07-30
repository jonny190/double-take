const mqtt = require('./mqtt.util');
const socket = require('./socket.util');
const database = require('./db.util');

let shuttingDown = false;

// close the http server, socket.io, the sqlite handle, and the mqtt client
// (after publishing the offline LWT) on a termination signal, with a hard
// timer so a stuck close can't hang the process forever
const close = async (server) => {
  await mqtt.available('offline');
  await Promise.allSettled([
    server
      ? new Promise((resolve) => {
          server.close(() => resolve());
        })
      : Promise.resolve(),
    socket.close(),
    mqtt.disconnect(),
  ]);
  database.close();
};

module.exports.listen = (server) => {
  const signals = {
    SIGHUP: 1,
    SIGINT: 2,
    SIGTERM: 15,
  };
  Object.keys(signals).forEach((signal) => {
    process.on(signal, async () => {
      if (shuttingDown) return;
      shuttingDown = true;
      const code = signals[signal];
      // don't let a hung handle block exit
      const force = setTimeout(() => process.exit(128 + code), 5000);
      force.unref();
      try {
        await close(server);
      } catch (error) {
        console.error(`shutdown error: ${error.message}`);
      }
      process.exit(128 + code);
    });
  });
};
