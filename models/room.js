import prismaClient from './prisma-client.js';

export async function readAll(id, date, filter, sortKeyword) {
  const rooms = prismaClient.$queryRawUnsafe(`SELECT
    rooms.id,
    rooms.title,
    rooms.type,
    rooms.province,
    rooms.city,
    JSON_ARRAYAGG(CASE WHEN rooms_image.id IS NOT NULL AND rooms_image.image IS NOT NULL THEN JSON_OBJECT('id', rooms_image.id, 'url',rooms_image.image) END) images,
    ${id ? `IFNULL(rooms_like.isLike,0) islike,` : ``}
    MAX(room_type.max_limit) max_limit,
    MIN(room_type.min_limit) min_limit,
    MAX(room_type.price) max_price,
    MIN(room_type.price) min_price,
    IFNULL(rooms_like_sum.likes,0) likes,
    theme.name theme
FROM rooms
LEFT JOIN rooms_image
ON rooms.id = rooms_image.rooms_id
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
`);
  return rooms;
}

function generateOrderByStatemnet(orderkeyword) {
  return orderkeyword ? ` ORDER BY ${orderkeyword}` : '';
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
    NOT BETWEEN ${date.start_date} AND ${date.end_date}
    AND reservation.end_date
    NOT BETWEEN ${date.start_date} AND ${date.end_date}
    OR reservation.start_date IS NULL AND reservation.end_date IS NULL) room_type
    ON rooms.id = room_type.rooms_id`
    : `JOIN room_type ON rooms.id = room_type.rooms_id`;
}

export async function readById(id) {}

export async function createLike(id) {}

export async function readRoomById(id) {}

export async function readBookingInfo(id, userId) {}

export async function createBooking(bookingInfo) {}
