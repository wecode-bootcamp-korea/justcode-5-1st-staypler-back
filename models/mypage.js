import prismaClient from './prisma-client.js';

export async function readMyPage(id) {}

export async function updateInfo(id, user) {}

export async function updatePassword(id, password) {}

export async function readWishRooms(id, page, count) {
  const wishRoomList = await prismaClient.$queryRaw`
      SELECT * FROM rooms AS r 
      LEFT JOIN room_type ON room_type.rooms_id = r.id
      LEFT JOIN rooms_image ON rooms_image.rooms_id = r.id
      LEFT JOIN likes ON likes.rooms_id = r.id
      WHERE likes.user_id = ${id}
      LIMIT ${count} OFFSET ${(page - 1) * count}`;
  return wishRoomList;
}

export async function readWishRoomsCount(id) {
  const wishRoomCount = await prismaClient.$queryRaw`
    SELECT count(*) cnt FROM rooms AS r
    LEFT JOIN likes ON likes.rooms_id = r.id
    WHERE likes.user_id = ${id}`;
  return wishRoomCount;
}

export async function readRoomsImages(roomid) {
  const roomsImageList = await prismaClient.$queryRaw`
    SELECT image FROM rooms_image AS ri
    WHERE ri.rooms_id = ${roomid}`;
  return roomsImageList;
}

export async function readBookingRooms(id) {}
