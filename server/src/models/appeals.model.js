// appeals-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const { REQUIRED_STRING, DATE, STRING } = require('../misc/mongoose-helpers');
const { APPEAL_STATUSES } = require('../misc/enums');

const createAutoIncrement = require('mongoose-sequence');

module.exports = function (app) {
  const modelName = 'appeals';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    firstName: REQUIRED_STRING,
    lastName: REQUIRED_STRING,
    patronymic: REQUIRED_STRING,
    phoneNumber: REQUIRED_STRING,
    message: REQUIRED_STRING,
    status: {
      ...REQUIRED_STRING,
      enum: Object.values(APPEAL_STATUSES),
      default: APPEAL_STATUSES.opened,
    },
    answer: STRING,
    closedAt: DATE,
  }, {
    timestamps: true,
  });

  schema.plugin(createAutoIncrement(mongooseClient), { id: '_id', inc_field: 'altId', disableHooks: true });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
