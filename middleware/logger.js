const pino = require('pino');

const transport = pino.transport({
  targets: [
    { target: 'pino-pretty', options: { destination: 1 }, level: 'info' },
    {
      target: 'pino/file',
      options: { destination: __dirname + '/logs/warn.log', mkdir: true },
      level: 'warn',
    },
    {
      target: 'pino/file',
      options: { destination: __dirname + '/logs/error.log', mkdir: true },
      level: 'error',
    },
  ],
});

const logger = pino(transport);

module.exports = logger;
