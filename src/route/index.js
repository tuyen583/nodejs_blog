const newRouter = require('./news');
const meRouter = require('./me');
const siteRouter = require('./site');
const courseRouter = require('./course');
function route(app) {
  app.use('/news', newRouter);
  app.use('/courses', courseRouter);
  app.use('/me', meRouter);
  app.use('/', siteRouter);
}

module.exports = route;
