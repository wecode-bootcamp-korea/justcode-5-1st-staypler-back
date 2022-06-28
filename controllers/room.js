import * as roomService from '../services/room.js';

export async function roomsController(req, res) {
  try {
    const rooms = await roomService.getRooms(null, req.query);
    res.status(200).json({ data: rooms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export function roomsDetailController(req, res) {}

export function roomsLikeController(req, res) {}

export function roomsRoomController(req, res) {}

export function roomsBookingInfoController(req, res) {}

export function roomsPaymentController(req, res) {}
