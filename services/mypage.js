import * as userRepository from '../models/user.js';
import bcrypt from 'bcrypt';

export function getMyPage(id) {}

export function updateMyPage(id, user) {}

export const updatePassword = async (
  userId,
  password,
  newPassword,
  confirmNewPassword
) => {
  const userPassword = await userRepository.getUserPasswordbyId(userId);
  const check = await bcrypt.compare(password, userPassword[0].password);
  const salt = await bcrypt.genSalt();

  if (!check) {
    const error = new Error('비밀번호가 틀렸습니다.');
    error.statusCode = 400;
    throw error;
  }
  if (!(newPassword === confirmNewPassword)) {
    const error = new Error('비밀번호가 일치하지 않습니다.');
    error.statusCode = 400;
    throw error;
  }

  const encryptPw = await bcrypt.hash(newPassword, salt);

  return await userRepository.updatePassword(userId, encryptPw);
};

export function getWishRooms(id) {}

export function getBookingRooms(id) {}
