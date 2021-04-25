const { BadRequest } = require('@feathersjs/errors');
const { APPEAL_STATUSES } = require('../../misc/enums');

const { Service } = require('feathers-mongoose');

exports.Appeals = class Appeals extends Service {
  patch(id, data, params) {
    const { status, answer } = data;

    if (!Object.values(APPEAL_STATUSES).includes(status)) throw new BadRequest();

    let closedAt;
    if (status === APPEAL_STATUSES.closed) closedAt = new Date();

    return super.patch(id, { status, closedAt, answer }, params);
  }
};
