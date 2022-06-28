import prismaClient from './prisma-client.js';

export async function readRoomsOfPromotion() {}

export async function readRoomsOfRecommend() {}

export async function readRoomsOfBanner() {
  const bannerList = await prismaClient.$queryRaw`
  SELECT rooms.id, rooms.title, banners.image, rooms.concept
FROM banners
JOIN rooms
ON banners.rooms_id = rooms.id`;

  return bannerList;
}
