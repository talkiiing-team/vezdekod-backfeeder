/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';

const LETTERS_AND_NUMBERS = /^[a-zA-Zа-яА-ЯёЁ\s0-9]*$/;

const PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])/;

export const username = yup
  .string()
  .required()
  .matches(LETTERS_AND_NUMBERS, 'Имя пользователя может содержать только буквы и цифры');

export const password = yup
  .string()
  .required()
  .matches(PASSWORD, 'Пароль должен содержать как минимум одну строчную, одну прописную букву, одну цифру и один спецсимвол.')
  .min(8, 'Пароль слишком короткий, минимум ${8}')
  .max(100, 'Пароль слишком длинный, максимум ${max}');
