const validate = require('../../hooks/validate');
const { create } = require('../../validation/appeals');
const { disallow } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [],
    find: [disallow('external')],
    get: [disallow('external')],
    create: [validate(create)],
    update: [disallow('external')],
    patch: [disallow('external')],
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
