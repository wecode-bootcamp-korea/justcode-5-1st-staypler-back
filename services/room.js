import * as roomRepositroy from '../models/room.js';

export async function getRooms(userId, query) {
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

  const [rooms, roomsCnt] = await roomRepositroy.readAll(
    userId,
    date,
    keyword,
    filter,
    sortKeyword,
    page
  );

  const result = rooms.map(room => {
    return { ...room, images: room.images.filter(Boolean) };
  });
  return [result, roomsCnt[0].total_rows];
}

export async function getRoomsById(userId, roomsId, date) {
  const check = await roomRepositroy.checkId(roomsId);
  if (!check.length) {
    const error = new Error('해당 페이지가 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  } else {
    return await roomRepositroy.readById(userId, roomsId, date);
  }
}

export async function likeRooms(userId, roomId) {
  const check = await roomRepositroy.checkLike(userId, roomId);
  if (!check) {
    await roomRepositroy.createLike(userId, roomId);
    return { isLike: true };
  } else {
    await roomRepositroy.updateLike(userId, roomId, !check.isLike);
    return { isLike: !check.isLike };
  }
}

export async function getRoomOfRooms(id, date) {
  const check = await roomRepositroy.roomCheck(id);
  if (!!check.length) {
    const result = await roomRepositroy.readRoomById(id, date);
    return result;
  } else {
    const error = new Error('Page Not Found');
    error.statusCode = 404;
    throw error;
  }
}

export async function getBookingInfoOfRooms(id, userId, date) {
  const check = await roomRepositroy.roomCheck(id);
  if (!!check.length) {
    const data = await roomRepositroy.readBookingInfo(id, userId, date);
    return data;
  } else {
    const error = new Error('Page Not Found');
    error.statusCode = 404;
    throw error;
  }
}

export async function paymentOfBooking(userId, roomId, bookingInfo) {
  // 해당 날짜에 예약이 가능한지 추가 확인을 한다.
  const check = await roomRepositroy.checkReservation(
    roomId,
    bookingInfo.start_date,
    bookingInfo.end_date
  );
  if (!!check.length) {
    const error = new Error('해당 날짜는 예약이 마감되었습니다.');
    error.statusCode = 400;
    throw error;
  } else {
    return await roomRepositroy.createBooking(userId, roomId, bookingInfo);
  }
}
