import * as roomRepositroy from '../models/room.js';

export async function getRooms(id, query) {
  const date = { start_date: query.start_date, end_date: query.end_date };

  const filter = {
    min_price: query.min_price,
    max_price: query.max_price,
    type: query.type,
    max_limit: query.max_limit,
    theme: query.theme,
  };
  const sortKeyword = query.sort;
  const rooms = await roomRepositroy.readAll(id, date, filter, sortKeyword);
  const result = rooms.map(room => {
    return { ...room, images: rooms.images ? room.images.filter(Boolean) : [] };
  });

  return result;
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

export function likeRooms(id) {}

export async function getRoomOfRooms(id, date) {
  const result = await roomRepositroy.readRoomById(id, date);
  return result;
}

export async function getBookingInfoOfRooms(id, userId, date) {
  const data = await roomRepositroy.readBookingInfo(id, userId, date);
  return data;
}

export async function paymentOfBooking(userId, roomId, bookingInfo) {
  // 해당 날짜에 예약이 가능한지 추가 확인을 한다.
  console.log(roomId, bookingInfo.start_date, bookingInfo.end_date);
  const check = await roomRepositroy.checkReservation(
    roomId,
    bookingInfo.start_date,
    bookingInfo.end_date
  );
  console.log(check);
  if (!!check.length) {
    const error = new Error('해당 날짜는 예약이 마감되었습니다.');
    error.statusCode = 400;
    throw error;
  } else {
    return await roomRepositroy.createBooking(userId, roomId, bookingInfo);
  }
}
