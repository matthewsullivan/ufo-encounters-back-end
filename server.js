const Koa = require('koa');

const app = new Koa();
const glob = require('glob');
const http = require('http');
const path = require('path');

const config = require(path.resolve('./config/env/default'));

glob.sync('./modules/*/routes/*.js').forEach((file) => { 
  app.use(require(path.resolve(file)).routes());
});

http.createServer(app.callback()).listen(config.server.port);

console.log(`\nufo-encounters-back-end`);
console.log(`Path: 127.0.0.1:3000`);
console.log(`${new Date().toString()}\n`);

module.exports = app;
