import * as roomRepositroy from '../models/room.js';

export async function getRooms(id, query) {
  const date = { start_date: query.start_date, end_date: query.end_date };

  const page = parseInt(query.page) - 1;

  const filter = {
    min_price: query.min_price,
    max_price: query.max_price,
    type: query.type,
    max_limit: query.max_limit,
    theme: query.theme,
  };

  const sortKeyword = query.sort;

  const [rooms, roomsCnt] = await roomRepositroy.readAll(
    id,
    date,
    filter,
    sortKeyword,
    page
  );

  const result = rooms.map(room => {
    return { ...room, images: rooms.images ? room.images.filter(Boolean) : [] };
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

export function likeRooms(id) {}

export async function getRoomOfRooms(id, date) {
  const result = await roomRepositroy.readRoomById(id, date);
  return result;
}

export async function getBookingInfoOfRooms(id, userId, date) {
  const data = await roomRepositroy.readBookingInfo(id, userId, date);
  return data;
}

export function paymentOfBooking(bookingInfo) {}
