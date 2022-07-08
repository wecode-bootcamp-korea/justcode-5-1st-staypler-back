import prismaClient from './prisma-client.js';

export async function readAccommodationImages(accommodationId) {
  const roomsImageList = await prismaClient.$queryRaw`
    SELECT image FROM rooms_image AS ri
    WHERE ri.rooms_id = ${accommodationId}`;
  return roomsImageList;
}

export async function readAccommodationImage(accommodationId) {
  const roomsImage = await prismaClient.$queryRaw`
  SELECT image FROM rooms_image WHERE rooms_image.rooms_id=${accommodationId} ORDER BY rooms_image.id limit 1`;

  return roomsImage;
}
