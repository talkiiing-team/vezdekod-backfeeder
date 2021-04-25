const { authenticate } = require('@feathersjs/authentication').hooks;
// const { disallow } = require('feathers-hooks-common');
const {
  hashPassword, protect,
} = require('@feathersjs/authentication-local').hooks;

const adminOnly = require('../../hooks/admin-only');

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt'), adminOnly() ],
    get: [ authenticate('jwt'), adminOnly() ],
    create: [ hashPassword('password'), adminOnly() ],
    update: [ hashPassword('password'),  authenticate('jwt'), adminOnly() ],
    patch: [ hashPassword('password'),  authenticate('jwt'), adminOnly() ],
    remove: [ authenticate('jwt'), adminOnly() ],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
