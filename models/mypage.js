import prismaClient from './prisma-client.js';

export async function readMyPage(userId) {
  const result = await prismaClient.$queryRaw`
  SELECT email,phone,name,profile_image_url FROM users WHERE id=${userId};
  `;
  return result;
}

export async function updateInfo(userInfo) {
  const result = await prismaClient.$queryRaw`
  UPDATE users SET name=${userInfo.name},phone=${userInfo.phone_number},profile_image_url=${userInfo.profile_image} WHERE id=${userInfo.userId}
  `;

  return result;
}

export async function readWishList(userId, page, count, isImageAll) {
  const wishRoomList = await prismaClient.$queryRawUnsafe(`
  SELECT r.id,r.concept, r.title rooms_name, r.type, r.address, r.province, r.city, room_type.max_price, room_type.min_price,room_type.max_limit,room_type.min_limit, room_type.max_price, room_type.min_price ${
    isImageAll
      ? `, (SELECT image FROM rooms_image WHERE rooms_image.rooms_id=r.id ORDER BY rooms_image.id limit 1) image`
      : ``
  }
  FROM rooms AS r
      LEFT JOIN (SELECT rooms_id,MAX(price) max_price, MIN(price) min_price, MAX(max_limit) max_limit, MIN(min_limit) min_limit FROM room_type GROUP BY rooms_id) room_type ON room_type.rooms_id = r.id
      LEFT JOIN rooms_image ON rooms_image.rooms_id = r.id
      LEFT JOIN likes ON likes.rooms_id = r.id
      WHERE likes.user_id = ${userId} AND likes.isLike=true
      GROUP BY r.id
      ORDER BY r.id
      LIMIT ${count} OFFSET ${(page - 1) * count}
  `);
  return wishRoomList;
}

export async function readWishListRowCount(userId) {
  const wishRoomCount = await prismaClient.$queryRaw`
    SELECT count(*) cnt FROM rooms AS r
    LEFT JOIN likes ON likes.rooms_id = r.id
    WHERE likes.user_id = ${userId}`;
  return wishRoomCount;
}

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

export async function readAccommodationImages(accommodationId) {
  const roomsImageList = await prismaClient.$queryRaw`
    SELECT image FROM rooms_image AS ri
    WHERE ri.rooms_id = ${accommodationId}`;
  return roomsImageList;
}

export async function readReservationList(userId, page, count, isImageAll) {
  const bookingRoomList = await prismaClient.$queryRawUnsafe(`
  SELECT rooms.id,rooms.title rooms_name,rooms.province,rooms.city ,reservation.start_date, reservation.end_date,r.max_limit,r.min_limit, r.price max_price, r.price min_price ${
    isImageAll
      ? `,(SELECT image FROM rooms_image WHERE rooms_image.id=r.rooms_id ORDER BY rooms_image.id limit 1) image`
      : ``
  }
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
