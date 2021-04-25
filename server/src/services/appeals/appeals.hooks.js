const validate = require('../../hooks/validate');
const { create } = require('../../validation/appeals');
const { disallow } = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication').hooks;
const adminOnly = require('../../hooks/admin-only');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), adminOnly()],
    get: [authenticate('jwt'), adminOnly()],
    create: [validate(create)],
    update: [disallow('external')],
    patch: [authenticate('jwt'), adminOnly()],
    remove: [disallow('external')],
  },

  after: {
    all: [],
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
