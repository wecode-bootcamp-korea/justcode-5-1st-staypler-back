import prismaClient from './prisma-client.js';

export async function readAll() {}

export async function readById(id) {}

export async function createLike(id) {}

export async function readRoomById(id) {}

export async function readBookingInfo(id, userId, date) {
  const timeDiff = `TIMESTAMPDIFF(DAY,'${date.start_date}','${date.end_date}')`;
  const result = await prismaClient.$queryRawUnsafe(`
  SELECT rooms.title, room_type.title, room_type.type, room_type.price, users.name, users.phone phone_number, users.email, ${timeDiff} nights, ${timeDiff} * room_type.price total_price
FROM room_type
JOIN rooms
ON room_type.rooms_id = rooms.id
JOIN (SELECT id,name,phone,email FROM users WHERE id=${userId}) users
WHERE room_type.id=${id}`);

  return result;
}

export async function createBooking(bookingInfo) {}
