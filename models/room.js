import prismaClient from './prisma-client.js';

export async function readAll() {}

export async function readById(id) {}

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

export async function readBookingInfo(id, userId) {}

export async function createBooking(bookingInfo) {}
