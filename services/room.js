import * as roomRepositroy from '../models/room.js';

export async function accommodationList(userId, query) {
  const date = { start_date: query.start_date, end_date: query.end_date };
  const page = parseInt(query.page) - 1;
  const keyword = query.search;
  const filter = {
    min_price: query.min_price,
    max_price: query.max_price,
    type: query.type,
    max_limit: query.max_limit,
    theme: query.theme,
  };
  const sortKeyword = query.sort;

  const [accommodationList, accommodationCount] = await roomRepositroy.readAll(
    userId,
    date,
    keyword,
    filter,
    sortKeyword,
    page
  );

  const result = accommodationList.map(accommodation => {
    return { ...accommodation, images: accommodation.images.filter(Boolean) };
  });
  return [result, accommodationCount[0].total_rows];
}

export async function accommodationById(userId, roomsId, date) {
  const check = await roomRepositroy.checkId(roomsId);
  if (!check.length) {
    const error = new Error('해당 페이지가 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  } else {
    const accommodation = await roomRepositroy.readById(userId, roomsId);
    const roomList = await roomRepositroy.roomImageById(date, roomsId);
    if (roomList.length) {
      accommodation[0].room = roomList[0].room;
      return rooms;
    } else {
      accommodation[0].room = [];
      return accommodation;
    }
  }
}

export async function accommodationLike(userId, roomId) {
  const check = await roomRepositroy.checkLike(userId, roomId);
  if (!check) {
    await roomRepositroy.createLike(userId, roomId);
    return { isLike: true };
  } else {
    await roomRepositroy.updateLike(userId, roomId, !check.isLike);
    return { isLike: !check.isLike };
  }
}

export async function roomById(id, date) {
  const check = await roomRepositroy.roomCheck(id);
  if (!!check.length) {
    const result = await roomRepositroy.roomById(id, date);
    return result;
  } else {
    const error = new Error('Page Not Found');
    error.statusCode = 404;
    throw error;
  }
}

export async function reservationInfo(roomTypeId, userId, date) {
  const check = await roomRepositroy.roomCheck(roomTypeId);
  const duplicateCheck = await roomRepositroy.checkReservation(
    roomTypeId,
    date.start_date,
    date.end_date
  );

  if (!!duplicateCheck.length) {
    const error = new Error('해당 날짜는 예약이 마감되었습니다.');
    error.statusCode = 400;
    throw error;
  }
  if (!!check.length) {
    const data = await roomRepositroy.readBookingInfo(roomTypeId, userId, date);
    return data;
  } else {
    const error = new Error('Page Not Found');
    error.statusCode = 404;
    throw error;
  }
}

export async function payment(userId, roomTypeId, bookingInfo) {
  // 해당 날짜에 예약이 가능한지 추가 확인을 한다.
  const check = await roomRepositroy.checkReservation(
    roomTypeId,
    bookingInfo.start_date,
    bookingInfo.end_date
  );
  if (!!check.length) {
    const error = new Error('해당 날짜는 예약이 마감되었습니다.');
    error.statusCode = 400;
    throw error;
  } else {
    return await roomRepositroy.payment(userId, roomTypeId, bookingInfo);
  }
}
