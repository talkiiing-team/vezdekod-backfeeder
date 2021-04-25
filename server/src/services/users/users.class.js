const { Service } = require('feathers-mongoose');

exports.Users = class Users extends Service {
  get(id, params) {
    if (id === 'my') {
      return super.get(params.user._id, params);
    }
    return super.get(id, params);
  }
};
