const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const parser = require('koa-better-body')();
const logger = require('koa-logger')();
const serve = require('koa-static');
const jucks = require('koa-nunjucks-2');
const glob = require('require-glob');
const path = require('path');
const config = require('./config');

// Default middleware
function* pass(next) {
  yield next;
}

// Load Nunjucks
app.context.render = jucks({
  ext: 'njk',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    autoescape: true,
    cache: config.cacheTemplates,
    watch: !config.cacheTemplates
  }
});

// Load routes
glob([path.join(__dirname, 'routes', '**', '*.js')]).then(routes => {
  for (const name in routes) {
    const route = routes[name];
    const path = route.path;
    const middleware = route.middleware || pass;
    router[route.method.toLowerCase() || 'get'](path, middleware, route);
  }
});

// Load middleware
if (config.logger) app.use(logger);
app.use(parser);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(path.join(__dirname, 'public')));

// Start!
app.listen(config.port, config.host, () => {
  console.log(`Server started on ${config.host}:${config.port}`);
});
