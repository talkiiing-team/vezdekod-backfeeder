const createAdminAccount = require('./create-admin-account');

module.exports = function (app) {
  app.configure(createAdminAccount);
};
