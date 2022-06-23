import * as roomService from '../services/room.js';

export async function roomsController(req, res) {
  const rooms = await roomService.getRooms(null, req.query);
  res.status(200).json({ data: rooms });
}

export function roomsDetailController(req, res) {}

export function roomsLikeController(req, res) {}

export function roomsRoomController(req, res) {}

export function roomsBookingInfoController(req, res) {}

export function roomsPaymentController(req, res) {}
