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

export function getRoomsById(id) {}

export function likeRooms(id) {}

export function getRoomOfRooms(id) {}

export function getBookingInfoOfRooms(id) {}

export function paymentOfBooking(bookingInfo) {}
