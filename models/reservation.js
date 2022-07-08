import prismaClient from '../models/prisma-client.js';

export async function readReservationRowCount(userId) {
  const bookingRoomCount = await prismaClient.$queryRaw`
  SELECT COUNT(*) cnt FROM (SELECT rooms.id,rooms.title name, reservation.start_date, reservation.end_date,r.max_limit,r.min_limit, r.price,(SELECT image FROM rooms_image WHERE rooms_image.id=r.rooms_id ORDER BY rooms_image.id limit 1) image
FROM reservation
JOIN (SELECT id FROM users WHERE id=${userId}) users
ON users.id = reservation.user_id
JOIN (SELECT room_type.rooms_id, room_type.id, max_limit, min_limit,price FROM room_type) r
ON reservation.room_type_id = r.id
JOIN rooms
ON r.rooms_id = rooms.id
ORDER BY reservation.start_date DESC) r;
  `;

  return bookingRoomCount;
}

export async function readReservationList(userId, page, count) {
  const bookingRoomList = await prismaClient.$queryRawUnsafe(`
  SELECT rooms.id rooms_id,rooms.title rooms_name,rooms.province,rooms.city ,reservation.start_date, reservation.end_date,r.max_limit,r.min_limit, r.price max_price, r.price min_price
 FROM reservation
 JOIN (SELECT id FROM users WHERE id=${userId}) users
 ON users.id = reservation.user_id
 JOIN (SELECT room_type.rooms_id, room_type.id, max_limit, min_limit,price FROM room_type) r
 ON reservation.room_type_id = r.id
 JOIN rooms
 ON r.rooms_id = rooms.id
 ORDER BY reservation.start_date DESC
 LIMIT ${count} OFFSET ${(page - 1) * count}
  `);

  return bookingRoomList;
}
