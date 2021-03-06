import * as roomRepository from '../models/room.js';
import * as roomsImageRepository from '../models/rooms-image.js';

export async function accommodationList(userId, query) {
  const date = { start_date: query.start_date, end_date: query.end_date };
  const page = parseInt(query.page ? query.page : 1) - 1;
  const limit = parseInt(query.limit ? query.limit : 6);
  const keyword = query.search;
  const filter = {
    min_price: query.min_price,
    max_price: query.max_price,
    type: query.type,
    max_limit: query.max_limit,
    theme: query.theme,
    province: query.province,
  };
  const sortKeyword = query.sort;

  const [accommodationList, accommodationCount] =
    await roomRepository.readAllAccommodations(
      userId,
      date,
      keyword,
      filter,
      sortKeyword,
      page,
      limit
    );

  const result = accommodationList.map(accommodation => {
    return { ...accommodation, images: accommodation.images.filter(Boolean) };
  });
  return [result, Math.ceil(accommodationCount[0].total_rows / 6)];
}

export async function accommodationById(userId, roomsId, date) {
  const check = await roomRepository.checkAccommodationId(roomsId);
  if (!check.length) {
    const error = new Error('해당 페이지가 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  } else {
    const accommodation = await roomRepository.readAccommodationById(
      userId,
      roomsId
    );
    const roomList = await roomRepository.readRooms(date, roomsId);
    if (roomList.length) {
      accommodation[0].room = roomList[0].room;
      return accommodation;
    } else {
      accommodation[0].room = [];
      return accommodation;
    }
  }
}

export async function accommodationLike(userId, roomId) {
  const check = await roomRepository.checkLike(userId, roomId);
  if (!check) {
    await roomRepository.createLike(userId, roomId);
    return { isLike: true };
  } else {
    await roomRepository.updateLike(userId, roomId, !check.isLike);
    const isLike = await roomRepository.checkLike(userId, roomId);
    return { isLike: Boolean(isLike.isLike) };
  }
}

export async function roomById(id, date) {
  const check = await roomRepository.roomCheck(id);
  if (!!check.length) {
    const result = await roomRepository.readRoomById(id, date);
    return result;
  } else {
    const error = new Error('Page Not Found');
    error.statusCode = 404;
    throw error;
  }
}

export async function reservationInfo(roomTypeId, userId, date) {
  const check = await roomRepository.roomCheck(roomTypeId);
  const duplicateCheck = await roomRepository.checkReservation(
    roomTypeId,
    date.start_date,
    date.end_date
  );
  if (!!check.length) {
    if (!!duplicateCheck.length) {
      const error = new Error('해당 날짜는 예약이 마감되었습니다.');
      error.statusCode = 400;
      throw error;
    }
    const data = await roomRepository.getRoomTypeByUserId(
      roomTypeId,
      userId,
      date
    );
    return data;
  } else {
    const error = new Error('Page Not Found');
    error.statusCode = 404;
    throw error;
  }
}

export async function payment(userId, roomTypeId, bookingInfo) {
  // 해당 날짜에 예약이 가능한지 추가 확인을 한다.
  const check = await roomRepository.checkReservation(
    roomTypeId,
    bookingInfo.start_date,
    bookingInfo.end_date
  );
  if (!!check.length) {
    const error = new Error('해당 날짜는 예약이 마감되었습니다.');
    error.statusCode = 400;
    throw error;
  } else {
    return await roomRepository.createResevation(
      userId,
      roomTypeId,
      bookingInfo
    );
  }
}

export async function getWishList({ userId, page, getImageAll, count }) {
  const maxPage = await roomRepository.readWishListRowCount(userId);
  const data = await roomRepository.readWishList(userId, page, count);
  if (getImageAll === '1') {
    for (let i = 0; i < data.length; i++) {
      data[i].image = await roomsImageRepository.readAccommodationImages(
        data[i].rooms_id
      );
      data[i].image = data[i].image.map(image => image.image);
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      const image = await roomsImageRepository.readAccommodationImage(
        data[i].rooms_id
      );
      data[i].image = image[0].image;
    }
  }
  return {
    data,
    maxPage: Math.ceil(maxPage[0].cnt / count),
  };
}
