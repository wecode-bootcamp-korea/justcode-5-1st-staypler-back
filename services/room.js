import * as roomRepositroy from '../models/room.js';

export function getRooms() {}

export function getRoomsById(id) {}

export function likeRooms(id) {}

export function getRoomOfRooms(id) {}

export async function getBookingInfoOfRooms(id, userId, date) {
  const data = await roomRepositroy.readBookingInfo(id, userId, date);
  return data;
}

export function paymentOfBooking(bookingInfo) {}
