import prismaClient from './prisma-client.js';

async function readMyPage(id) {}

async function updateInfo(id, user) {}

async function updatePassword(id, password) {}

async function readWishRooms(id) {}

async function readBookingRooms(id) {}

module.exports = {
  readMyPage,
  updateInfo,
  updatePassword,
  readWishRooms,
  readBookingRooms,
};
