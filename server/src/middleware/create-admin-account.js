const { USER_ROLES } = require('../misc/enums');

module.exports = function (app) {
  const adminData = app.get('adminData');
  app.service('users').create({
    ...adminData,
    role: USER_ROLES.admin,
  });
};
