// const { Service } = require('feathers-mongoose');
exports.Stats = class Stats {
  constructor(_, app) {
    this.app = app;
  }

  async find({ query }) {
    const Appeals = this.app.service('appeals').Model;
    const total = await Appeals.find(query).countDocuments();
    const closed = await Appeals.find({ ...query, status: 'closed' }).countDocuments();
    return {
      total,
      closed,
    };
  }
};
