import * as roomService from '../services/room.js';

export function roomsController(req, res) {}

export function roomsDetailController(req, res) {}

export function roomsLikeController(req, res) {}

export function roomsRoomController(req, res) {}

export async function roomsBookingInfoController(req, res) {
  try {
    const data = await roomService.getBookingInfoOfRooms(req.query.room_id, 2, {
      start_date: req.query.start_date,
      end_date: req.query.end_date,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export function roomsPaymentController(req, res) {}
