// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { USER_ROLES } = require('../misc/enums');
const { MethodNotAllowed } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (!context.params.provider) {
      return context;
    }

    const isAdmin = context.params.user.role === USER_ROLES.admin;

    if (isAdmin) {
      return context;
    }

    throw new MethodNotAllowed();
  };
};
