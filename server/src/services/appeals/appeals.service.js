// Initializes the `appeals` service on path `/appeals`
const { Appeals } = require('./appeals.class');
const createModel = require('../../models/appeals.model');
const hooks = require('./appeals.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/appeals', new Appeals(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('appeals');

  service.hooks(hooks);
};
