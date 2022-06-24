import * as roomService from '../services/room.js';

export function roomsController(req, res) {}

export async function roomsDetailController(req, res) {
  try {
    const result = await roomService.getRoomsById(null, req.params.id, {
      start_date: req.query.start_date,
      end_date: req.query.end_date,
    });
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
}

export function roomsLikeController(req, res) {}

export function roomsRoomController(req, res) {}

export function roomsBookingInfoController(req, res) {}

export function roomsPaymentController(req, res) {}
