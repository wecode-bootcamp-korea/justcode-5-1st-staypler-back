import prismaClient from './prisma-client.js';

export async function readMyPage(id) {}

export async function updateInfo(id, user) {}

export async function readWishRooms(id, page, count, getImageAll) {
  const wishRoomList = await prismaClient.$queryRawUnsafe(`
  SELECT r.id,r.concept, r.title rooms_name, r.type, r.address, r.province, r.city, room_type.max_price, room_type.min_price,room_type.max_limit,room_type.min_limit, room_type.max_price, room_type.min_price ${
    getImageAll
      ? `, (SELECT image FROM rooms_image WHERE rooms_image.rooms_id=r.id ORDER BY rooms_image.id limit 1) image`
      : ``
  }
  FROM rooms AS r
      LEFT JOIN (SELECT rooms_id,MAX(price) max_price, MIN(price) min_price, MAX(max_limit) max_limit, MIN(min_limit) min_limit FROM room_type GROUP BY rooms_id) room_type ON room_type.rooms_id = r.id
      LEFT JOIN rooms_image ON rooms_image.rooms_id = r.id
      LEFT JOIN likes ON likes.rooms_id = r.id
      WHERE likes.user_id = ${id}
      GROUP BY r.id
      ORDER BY r.id
      LIMIT ${count} OFFSET ${(page - 1) * count}
  `);
  return wishRoomList;
}

export async function readWishRoomsCount(id) {
  const wishRoomCount = await prismaClient.$queryRaw`
    SELECT count(*) cnt FROM rooms AS r
    LEFT JOIN likes ON likes.rooms_id = r.id
    WHERE likes.user_id = ${id}`;
  return wishRoomCount;
}

export async function readBookingRoomsCount(userId) {
  const bookingRoomCount = await prismaClient.$queryRaw`
  SELECT count(*) cnt FROM (SELECT r.title name, reservation.start_date, reservation.end_date, (SELECT image FROM rooms_image WHERE rooms_image.id=r.rooms_id ORDER BY rooms_image.id limit 1) image
FROM reservation
JOIN (SELECT id FROM users WHERE id=${userId}) users
ON users.id = reservation.user_id
JOIN (SELECT rooms.title,room_type.id, rooms.id rooms_id FROM room_type LEFT JOIN rooms ON room_type.rooms_id = rooms.id) r
ON reservation.room_type_id = r.id
ORDER BY reservation.start_date DESC) r;
  `;

  return bookingRoomCount;
}

export async function readRoomsImages(roomid) {
  const roomsImageList = await prismaClient.$queryRaw`
    SELECT image FROM rooms_image AS ri
    WHERE ri.rooms_id = ${roomid}`;
  return roomsImageList;
}

export async function readBookingRooms(userId, page, count, getImageAll) {
  const bookingRoomList = await prismaClient.$queryRawUnsafe(`
  SELECT r.rooms_id id,r.title rooms_name, reservation.start_date, reservation.end_date,r.max_limit,r.min_limit,r.max_price,r.min_price,r.province,r.city ${
    getImageAll
      ? `,(SELECT image FROM rooms_image WHERE rooms_image.id=r.rooms_id ORDER BY rooms_image.id limit 1) image`
      : ``
  }
FROM reservation
JOIN (SELECT id FROM users WHERE id=${userId}) users
ON users.id = reservation.user_id
JOIN (SELECT rooms.title,room_type.id, rooms.id rooms_id, MAX(max_limit) max_limit, MIN(min_limit) min_limit, MAX(price) max_price, MIN(price) min_price, rooms.province, rooms.city FROM room_type LEFT JOIN rooms ON room_type.rooms_id = rooms.id) r
ON reservation.room_type_id = r.id
ORDER BY reservation.start_date DESC
LIMIT ${count} OFFSET ${(page - 1) * count}
  `);

  return bookingRoomList;
}
