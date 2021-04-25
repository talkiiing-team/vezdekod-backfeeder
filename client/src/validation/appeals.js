/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';

const ONLY_LETTERS = /^[a-zA-Zа-яА-ЯёЁ\s]*$/;

const ONLY_NUMBERS = /^\d*$/;

const REQUIRED_STRING = yup
  .string()
  .trim()
  .required();

export const firstName = REQUIRED_STRING
  .matches(ONLY_LETTERS, 'Имя может содержать только буквы')
  .max(30, 'Имя слишком длинное, максимум ${max} символов');

export const lastName = REQUIRED_STRING
  .matches(ONLY_LETTERS, 'Фамилия может содержать только буквы')
  .max(30, 'Фамилия слишком длинная, максимум ${max} символов');

export const patronymic = REQUIRED_STRING
  .matches(ONLY_LETTERS, 'Отчество может содержать только буквы')
  .max(30, 'Отчество слишком длинное, максимум ${max} символов');

export const phoneNumber = REQUIRED_STRING
  .matches(ONLY_NUMBERS, 'Телефон может состоять только из цифр')
  .length(11, 'Телефон должен содержать ${length} символов');

export const message = REQUIRED_STRING
  .min(50, 'Сообщение слишком короткое, минимум ${min} символов')
  .max(10000, 'Сообщение слишком длинное, максимум ${max} символов');
