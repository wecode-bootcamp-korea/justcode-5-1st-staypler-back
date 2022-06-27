import * as roomRepositroy from '../models/room.js';

export function getRooms() {}

export function getRoomsById(id) {}

export function likeRooms(id) {}

export async function getRoomOfRooms(id, date) {
  const result = await roomRepositroy.readRoomById(id, date);
  return result;
}

export function getBookingInfoOfRooms(id) {}

export function paymentOfBooking(bookingInfo) {}
