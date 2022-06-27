import prismaClient from './prisma-client.js';

export async function readRoomsOfPromotion() {
  const promotionList = await prismaClient.$queryRaw`
  SELECT r.title room_name, r.type, r.province, r.city, promotion.image, promotion.title promotion_title, promotion.sub_title promotion_sub_title,TIMESTAMPDIFF(DAY,promotion.start_date, promotion.end_date) left_days
FROM promotion
JOIN (SELECT rooms.id,
             rooms.title,
             rooms.type,
             rooms.province,
             rooms.city,
             MAX(room_type.price) max_price,
             MIN(room_type.price) min_price,
             MAX(room_type.max_limit) max_limit,
             MIN(room_type.min_limit) min_limit
      FROM rooms JOIN room_type ON rooms.id = room_type.rooms_id GROUP BY rooms.id) r
ON r.id = promotion.rooms_id
WHERE CURDATE() BETWEEN promotion.start_date AND promotion.end_date`;

  return promotionList;
}

export async function readRoomsOfRecommend() {}

export async function readRoomsOfBanner() {}
