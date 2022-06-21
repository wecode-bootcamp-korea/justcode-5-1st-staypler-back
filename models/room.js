import prismaClient from './prisma-client.js';

async function readAll() {}

async function readById(id) {}

async function createLike(id) {}

async function readRoomById(id) {}

async function readBookingInfo(id, userId) {}

async function createBooking(bookingInfo) {}

module.exports = {
  readAll,
  readById,
  createLike,
  readRoomById,
  readBookingInfo,
  createBooking,
};
