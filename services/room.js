import * as roomRepositroy from '../models/room.js';

export function getRooms() {}

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

export function getRoomOfRooms(id) {}

export function getBookingInfoOfRooms(id) {}

export function paymentOfBooking(bookingInfo) {}
