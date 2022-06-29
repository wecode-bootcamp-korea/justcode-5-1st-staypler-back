import prismaClient from './prisma-client.js';

export async function readAll(id, date, filter, sortKeyword, page) {
  const sql = `SELECT
  rooms.id,
  rooms.title,
  rooms.type,
  rooms.province,
  rooms.city,
  ri.images,
  IFNULL(rooms_like_sum.likes,0) likes,
  ${id ? `IFNULL(rooms_like.isLike,0) islike,` : ``}
  MAX(room_type.max_limit) max_limit,
  MIN(room_type.min_limit) min_limit,
  MAX(room_type.price) max_price,
  MIN(room_type.price) min_price,
  theme.name theme
FROM rooms
LEFT JOIN (SELECT rooms_image.rooms_id, JSON_ARRAYAGG(CASE WHEN rooms_image.id IS NOT NULL AND rooms_image.image IS NOT NULL THEN JSON_OBJECT('id', rooms_image.id, 'url',rooms_image.image) END) images FROM rooms_image GROUP BY rooms_image.rooms_id) ri
ON rooms.id = ri.rooms_id
${
  id
    ? `LEFT JOIN (SELECT id,rooms_id, isLike FROM likes WHERE user_id=${id} group by id) as rooms_like ON rooms_like.rooms_id = rooms.id`
    : ``
} 
${generateJoinDateStatement(date.start_date, date.end_date)}
LEFT JOIN (SELECT rooms_id, SUM(isLike) likes FROM likes group by rooms_id) rooms_like_sum
ON rooms_like_sum.rooms_id = rooms.id
LEFT JOIN (SELECT rooms_id, theme.name FROM theme JOIN rooms_theme on theme.id = rooms_theme.theme_id) theme
ON theme.rooms_id = rooms.id
LEFT JOIN reservation on room_type.id = reservation.room_type_id
GROUP BY rooms.id${id ? `, islike` : ``}
${generateHavingStatement(filter)}
${generateOrderByStatemnet(sortKeyword)}

`;
  const roomsCnt = await prismaClient.$queryRawUnsafe(
    `SELECT COUNT(*) total_rows FROM (${sql}) t`
  );
  const rooms = await prismaClient.$queryRawUnsafe(
    sql + generateLimitOffsetStatement(page)
  );

  return [rooms, roomsCnt];
}

function generateOrderByStatemnet(orderkeyword) {
  return orderkeyword
    ? ` ORDER BY rooms.id,${orderkeyword}`
    : ' ORDER BY rooms.id';
}

function generateHavingStatement({
  min_price,
  max_price,
  type,
  max_limit,
  theme,
}) {
  const havingArray = [];
  if (min_price) {
    havingArray.push(`min_price > ${min_price}`);
  }
  if (max_price) {
    havingArray.push(`max_price < ${max_price}`);
  }
  if (type) {
    havingArray.push(`type='${type}'`);
  }
  if (max_limit) {
    havingArray.push(`max_limit > ${max_limit}`);
  }
  if (theme) {
    havingArray.push(`theme='${theme}'`);
  }
  return havingArray.length ? `HAVING ${havingArray.join(' and ')}` : '';
}

function generateJoinDateStatement(date) {
  return date
    ? `JOIN (SELECT room_type.id,room_type.rooms_id,room_type.max_limit,room_type.min_limit,room_type.price
    FROM room_type
    LEFT JOIN reservation
    ON room_type.id = reservation.room_type_id
    WHERE reservation.start_date
    NOT BETWEEN '${date.start_date}' AND '${date.end_date}'
    AND reservation.end_date
    NOT BETWEEN '${date.start_date}' AND '${date.end_date}'
    OR reservation.start_date IS NULL AND reservation.end_date IS NULL) room_type
    ON rooms.id = room_type.rooms_id`
    : `JOIN room_type ON rooms.id = room_type.rooms_id`;
}

function generateLimitOffsetStatement(page) {
  const limit = 6;
  return ` LIMIT ${limit} OFFSET ${limit * page}`;
}

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

export async function readRoomById(id, date) {
  const room = await prismaClient.$queryRawUnsafe(`
    SELECT reservations.id,room_type.title room_name,rti.images ,room_type.check_in_time, room_type.check_out_time, room_type.price,${
      date.start_date && date.end_date
        ? `TIMESTAMPDIFF(DAY ,'${date.start_date}','${date.end_date}') * room_type.price total_price,`
        : ``
    } room_type.min_limit, room_type.max_limit
FROM room_type
LEFT JOIN (SELECT room_type_image.id,room_type_image.room_type_id,JSON_ARRAYAGG(CASE WHEN room_type_image.id IS NOT NULL THEN JSON_OBJECT('id',room_type_image.id,'image',room_type_image.image) END ) images FROM room_type_image GROUP BY room_type_image.room_type_id) rti
ON rti.room_type_id = room_type.id
JOIN (SELECT room_type.id
FROM room_type
LEFT JOIN reservation
ON reservation.room_type_id = room_type.id
${generateWhereStatement(date)}) reservations
ON reservations.id = room_type.id
LEFT JOIN reservation 
ON room_type.id = reservation.room_type_id
WHERE reservations.id =${id}`);

  return room;
}

const generateWhereStatement = date => {
  return date.start_date && date.end_date
    ? `WHERE reservation.start_date
  NOT BETWEEN '${date.start_date}' AND '${date.end_date}'
AND reservation.end_date
    NOT BETWEEN '${date.start_date}' AND '${date.end_date}'
OR reservation.start_date IS NULL AND reservation.end_date IS NULL`
    : ``;
};

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

export async function checkReservation(room_id, start_date, end_date) {
  const check = prismaClient.$queryRawUnsafe(`SELECT room_type.id
FROM room_type
LEFT JOIN reservation
ON reservation.room_type_id = room_type.id
WHERE reservation.start_date
NOT BETWEEN '${start_date}' AND '${end_date}'
AND reservation.end_date
NOT BETWEEN '${start_date}' AND '${end_date}'
OR reservation.start_date IS NULL AND reservation.end_date IS NULL
GROUP BY room_type.id
HAVING room_type.id = ${room_id}`);
  return check;
}

export async function createBooking(userId, roomId, bookingInfo) {
  // userId, roomId, bookingInfo
  const result = prismaClient.$queryRawUnsafe(`
  INSERT INTO reservation(room_type_id,user_id,name,phone,email,number,start_date,end_date) VALUES(${roomId},${userId},'${bookingInfo.name}','${bookingInfo.phone_number}','${bookingInfo.email}',${bookingInfo.number} ,'${bookingInfo.start_date}','${bookingInfo.end_date}');
  `);
  return result;
}
