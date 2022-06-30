import * as userRepository from '../models/user.js';
import * as myPageRepository from '../models/mypage.js';
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

export async function getWishRooms({ id, page, count, getImageAll }) {
  const maxPage = await myPageRepository.readWishRoomsCount(id);
  const data = await myPageRepository.readWishRooms(
    id,
    page,
    count,
    getImageAll
  );
  if (getImageAll === '1') {
    for (let i = 0; i < data.length; i++) {
      delete data[i].concept;
      delete data[i].type;
      delete data[i].address;
      delete data[i].check_in_time;
      delete data[i].check_out_time;
      delete data[i].user_id;
      delete data[i].isLike;
      delete data[i].created_at;
      delete data[i].updated_at;

      data[i].image = await myPageRepository.readRoomsImages(data[i].id);
      data[i].image = data[i].image.map(image => image.image);
    }
  }

  return {
    data,
    maxPage: Math.ceil(maxPage[0].cnt / count),
  };
}

export async function getBookingRooms({ id, page, count, getImageAll }) {
  const maxPage = await myPageRepository.readBookingRoomsCount(id);
  const data = await myPageRepository.readBookingRooms(
    id,
    page,
    count,
    getImageAll
  );
  if (getImageAll === '1') {
    for (let i = 0; i < data.length; i++) {
      data[i].image = await myPageRepository.readRoomsImages(data[i].id);
      data[i].image = data[i].image.map(image => image.image);
    }
  }
  return {
    data,
    maxPage: Math.ceil(maxPage[0].cnt / count),
  };
}

export async function getHeader(userId) {
  const [check] = await userRepository.getUserIdbyId(userId);
  if (!check) {
    const error = new Error('User Not Found');
    error.statusCode = 400;
    throw error;
  }
  const result = await userRepository.readUserInfo(userId);
  return result;
}
