import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as userRepository from '../models/user.js';

dotenv.config();

export const signUp = async (email, username, password, phoneNumber) => {
  //password validation
  const passwordValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );
  if (!passwordValidation.test(password)) {
    const err = new Error('PASSWORD_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }

  //중복 이메일
  const userEmail = await userRepository.readUserByEmail(email);
  if (userEmail.length) {
    const err = new Error('EXISTING_USER');
    err.statusCode = 409;
    throw err;
  }

  //email validation
  const emailValidation = new RegExp(
    `^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}`
  );
  if (!emailValidation.test(email)) {
    const err = new Error('EMAIL_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }

  //userName validation
  if (!username.length || username.length > 10) {
    const err = new Error('USERNAME_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }

  //phoneNumber validation
  const phoneNumberValidation = new RegExp(
    '^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})'
  );
  if (!phoneNumberValidation.test(phoneNumber)) {
    const err = new Error('PHONE_NUMBER_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }
  const salt = await bcrypt.genSalt();
  const encryptPassword = await bcrypt.hash(password, salt); //솔팅 -> 임의로 생성된 문자열

  const createUser = await userRepository.createUser(
    email,
    username,
    encryptPassword,
    phoneNumber
  );

  return createUser;
};

export const login = async (email, password) => {
  //회원가입한 유저인지 확인
  const user = await userRepository.readUserByEmail(email);
  if (user.length === 0) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;
    throw error;
  }

  //비밀번호 확인
  const inputPassword = await userRepository.passwordIsCorrect(email);
  const passwordIsCorrect = await bcrypt.compare(
    password,
    inputPassword[0].password
  );

  if (!passwordIsCorrect) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;
    throw error;
  }

  const [{ id }] = await userRepository.getUserIdByEmail(email);
  const token = jwt.sign({ id }, process.env.SECRET_KEY);
  return token;
};
