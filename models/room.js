import prismaClient from './prisma-client.js';

export async function readAll() {}

export async function checkId(roomId) {
  const room = await prismaClient.$queryRaw`
  SELECT * FROM rooms WHERE id=${roomId}`;
  return room;
}

export async function readById(userId, roomId, date) {
  const roomInfo = prismaClient.$queryRawUnsafe(`SELECT
rooms.title,
rooms.province,
rooms.city,
rooms.concept,
ri.images,
rt.room,
rs.specials,
JSON_OBJECT('id',rooms_intro.id,'title ',rooms_intro.title, 'main_content',rooms_intro.main_content,'sub_content',rooms_intro.sub_content) intro,
${userId ? `IFNULL(rooms_like.isLike,0) islike,` : ``}
rooms.address

FROM (SELECT id, title, concept, address, province, city FROM rooms GROUP BY id) rooms
JOIN (SELECT rooms_image.rooms_id,JSON_ARRAYAGG(CASE WHEN rooms_image.id IS NOT NULL AND rooms_image.image IS NOT NULL THEN JSON_OBJECT('id', rooms_image.id, 'url',rooms_image.image) END)  images FROM rooms_image GROUP BY rooms_image.rooms_id) ri
ON rooms.id = ri.rooms_id
LEFT JOIN (SELECT room_type.rooms_id,JSON_ARRAYAGG(CASE WHEN room_type.id IS NOT NULL THEN JSON_OBJECT('id',room_type.id,'title',room_type.title,'type',room_type.type,'price',room_type.price,'image',rti.image) END) room FROM room_type JOIN (SELECT id,room_type_id,image FROM room_type_image GROUP BY room_type_image.room_type_id ORDER BY room_type_id) rti ON rti.room_type_id=room_type.id ${generateJoinStatement(
    date
  )} GROUP BY room_type.rooms_id) rt
ON rt.rooms_id = rooms.id
${
  userId
    ? `LEFT JOIN (SELECT id,rooms_id, isLike FROM likes WHERE user_id=${userId} ) as rooms_like
ON rooms_like.rooms_id = rooms.id`
    : ``
}
JOIN rooms_intro
ON rooms.id = rooms_intro.rooms_id
JOIN (SELECT rooms_special.rooms_id,JSON_ARRAYAGG(CASE WHEN rooms_special.id IS NOT NULL THEN JSON_OBJECT('id',rooms_special.id,'title',rooms_special.title,'content',rooms_special.content,'image',rooms_special.image) END) specials FROM rooms_special GROUP BY rooms_special.rooms_id) rs
ON rooms.id = rs.rooms_id
WHERE rooms.id=${roomId}
GROUP BY rooms.id`);

  return roomInfo;
}

function generateJoinStatement(date) {
  return !!(date.start_date && date.end_date)
    ? `LEFT JOIN reservation
  ON reservation.room_type_id = room_type.id
WHERE reservation.start_date
NOT BETWEEN '${date.start_date}' AND '${date.end_date}'
AND reservation.end_date
NOT BETWEEN '${date.start_date}' AND '${date.end_date}'
OR reservation.start_date IS NULL AND reservation.end_date IS NULL`
    : ``;
}

export async function createLike(id) {}

export async function readRoomById(id) {}

export async function readBookingInfo(id, userId) {}

export async function createBooking(bookingInfo) {}
