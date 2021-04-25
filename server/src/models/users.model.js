// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const { USER_ROLES } = require('../misc/enums');

module.exports = function (app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      default: USER_ROLES.default,
      enum: Object.values(USER_ROLES),
    },
    password: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
