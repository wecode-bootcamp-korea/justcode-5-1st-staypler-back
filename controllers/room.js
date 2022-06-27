import * as roomService from '../services/room.js';

export function roomsController(req, res) {}

export function roomsDetailController(req, res) {}

export function roomsLikeController(req, res) {}

export async function roomsRoomController(req, res) {
  try {
    const result = await roomService.getRoomOfRooms(req.query.room_id, {
      start_date: req.query.start_date,
      end_date: req.query.end_date,
    });

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export function roomsBookingInfoController(req, res) {}

export function roomsPaymentController(req, res) {}
