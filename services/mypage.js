import * as userRepository from '../models/user.js';
import * as myPageRepository from '../models/mypage.js';
import bcrypt from 'bcrypt';

export async function getMyPage(userId) {
  const userInfo = await myPageRepository.readMyPage(userId);
  return userInfo;
}

export async function updateMyPage(userInfo) {
  const phoneNumberValidation = new RegExp(
    '^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})'
  );
  if (!phoneNumberValidation.test(userInfo.phone_number)) {
    const err = new Error('PHONE_NUMBER_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }
  return await myPageRepository.updateMyPage(userInfo);
}

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

  const encryptPassword = await bcrypt.hash(newPassword, salt);

  return await userRepository.updatePassword(userId, encryptPassword);
};

export async function getWishList({ userId, page, count, getImageAll }) {
  const maxPage = await myPageRepository.readWishListRowCount(userId);
  const data = await myPageRepository.readWishList(
    userId,
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

      data[i].image = await myPageRepository.readAccommodationImages(
        data[i].id
      );
      data[i].image = data[i].image.map(image => image.image);
    }
  }

  return {
    data,
    maxPage: Math.ceil(maxPage[0].cnt / count),
  };
}

export async function getReservationList({ userId, page, count, getImageAll }) {
  const maxPage = await myPageRepository.readReservationRowCount(userId);
  const data = await myPageRepository.readReservationList(
    userId,
    page,
    count,
    getImageAll
  );
  if (getImageAll === '1') {
    for (let i = 0; i < data.length; i++) {
      data[i].image = await myPageRepository.readAccommodationImages(
        data[i].id
      );
      data[i].image = data[i].image.map(image => image.image);
    }
  }
  return {
    data,
    maxPage: Math.ceil(maxPage[0].cnt / count),
  };
}

export async function getHeader(userId) {
  const [check] = await userRepository.getUserbyId(userId);
  if (!check) {
    const error = new Error('User Not Found');
    error.statusCode = 400;
    throw error;
  }
  const result = await userRepository.readUserInfo(userId);
  return result;
}
