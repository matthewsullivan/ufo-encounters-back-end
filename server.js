const glob = require('glob');
const http = require('http');
const Koa = require('koa');
const passport = require('koa-passport');
const session = require('koa-session');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();
const config = require(path.resolve('./config/env/default'));

app
  .use(session(config.session, app))
  .use(passport.initialize())
  .use(passport.session())
  .use(serve(path.resolve('./static'), {hidden: true}));

glob.sync('./modules/*/routes/*.js').forEach((file) => {
  const route = require(path.resolve(file));
 
  app.use(route.routes());
});

app.keys = ['ufo-encounters-back-end'];
app.proxy = true;

if (!module.parent) {
  http.createServer(app.callback()).listen(config.server.port);
}

console.log(`\nufo-encounters-back-end`);
console.log(`Path: 127.0.0.1:3000`);
console.log(`${new Date().toString()}\n`);

module.exports = app;
