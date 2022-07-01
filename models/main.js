import prismaClient from './prisma-client.js';

export async function readRoomsOfPromotion() {
  const promotionList = await prismaClient.$queryRaw`
    SELECT promotion.id, r.id room_id, r.title room_name, r.type room_type, r.province, r.city,r.max_price,r.min_price,r.max_limit,r.min_limit ,promotion.image, promotion.title promotion_title, promotion.sub_title promotion_sub_title,TIMESTAMPDIFF(DAY,promotion.start_date, promotion.end_date) left_days
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

export async function readRoomsOfRecommend() {
  const recommendList = await prismaClient.$queryRaw`
  SELECT recommend_to_user.id, recommend_to_user.rooms_id, recommend_to_user.image, r.title, r.province, r.city, r.max_price, r.min_price
FROM recommend_to_user
LEFT JOIN (SELECT
               rooms.id,
               rooms.title,
               rooms.province,
               rooms.city,
               MAX(room_type.price) max_price, 
               MIN(room_type.price) min_price
           FROM rooms
               JOIN room_type
                   ON rooms.id = room_type.rooms_id
           GROUP BY rooms.id) r
ON recommend_to_user.rooms_id = r.id`;
  return recommendList;
}

export async function readRoomsOfBanner() {
  const bannerList = await prismaClient.$queryRaw`
  SELECT banners.id, rooms.id room_id, rooms.title room_name, banners.image, rooms.concept
FROM banners
JOIN rooms
ON banners.rooms_id = rooms.id`;

  return bannerList;
}
