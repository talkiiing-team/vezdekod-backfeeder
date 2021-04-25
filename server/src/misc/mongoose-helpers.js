const { Schema } = require('mongoose');

const STRING = {
  type: String,
};

const BOOLEAN = {
  type: Boolean,
};

const NUMBER = {
  type: Number,
};

const DATE = {
  type: Date,
};

const OBJECT_ID = {
  type: Schema.Types.ObjectId,
};

const REQUIRED_STRING = {
  ...STRING,
  required: true,
};

const REQUIRED_BOOLEAN = {
  ...BOOLEAN,
  required: true,
};

const REQUIRED_NUMBER = {
  ...NUMBER,
  required: true,
};

const REQUIRED_DATE = {
  ...DATE,
  required: true,
};

const REQUIRED_OBJECT_ID = {
  ...OBJECT_ID,
  required: true,
};

module.exports = {
  STRING,
  BOOLEAN,
  NUMBER,
  DATE,
  OBJECT_ID,
  REQUIRED_STRING,
  REQUIRED_BOOLEAN,
  REQUIRED_NUMBER,
  REQUIRED_DATE,
  REQUIRED_OBJECT_ID,
};
