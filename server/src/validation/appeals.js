const yup = require('yup');

const ONLY_LETTERS = /^[a-zA-Zа-яА-ЯёЁ\s]*$/;

const ONLY_NUMBERS = /^\d*$/;

const NAME = yup
  .string()
  .trim()
  .required()
  .matches(ONLY_LETTERS)
  .max(30);

const create = yup.object({
  firstName: NAME,
  lastName: NAME,
  patronymic: NAME,
  phoneNumber: yup
    .string()
    .trim()
    .required()
    .matches(ONLY_NUMBERS)
    .min(11)
    .max(11),
  message: yup
    .string()
    .trim()
    .required()
    .min(50)
    .max(10000),
});

module.exports = {
  create,
};
