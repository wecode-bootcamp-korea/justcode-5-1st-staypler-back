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

export function getBookingInfoOfRooms(id) {}

export function paymentOfBooking(bookingInfo) {}
