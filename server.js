const Koa = require('koa');

const app = new Koa();
const convert = require('koa-convert');
const cors = require('kcors');
const glob = require('glob');
const http = require('http');
const path = require('path');

const config = require(path.resolve('./config/env/default'));
const origin = process.env.URL_ORIGIN;
const whitelist = origin ? origin.split(' ').join(' || ') : 'http://localhost:4000';

const corsOptions = {
  credentials: true,
  origin: getOrigin,
};

/**
 * Get origin
 * @param {object} ctx
 * @return {object}
 */
function getOrigin(ctx) {
  const origin = ctx.accept.headers.origin;

  console.log(whitelist);

  if (!whitelist.includes(origin)) {
    return ctx.throw(`${origin} is not a valid origin`);
  }

  return origin;
}


app.use(convert(cors(corsOptions)))

glob.sync('./modules/*/routes/*.js').forEach((file) => { 
  app.use(require(path.resolve(file)).routes());
});

http.createServer(app.callback()).listen(config.server.port);

console.log(`\nufo-encounters-back-end`);
console.log(`Path: 127.0.0.1:3000`);
console.log(`${new Date().toString()}\n`);

module.exports = app;
