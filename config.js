module.exports = require('rc')('koat', {
  port: 3000,
  host: '127.0.0.1',
  logger: false,
  cacheTemplates: true,
  rethink: {
    host: 'localhost',
    port: 28015,
    db: 'app'
  }
});
