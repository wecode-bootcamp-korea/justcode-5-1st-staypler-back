import * as roomService from '../services/room.js';

export async function roomsController(req, res) {
  try {
    const [rooms, roomsCnt] = await roomService.getRooms(null, req.query);
    res.status(200).json({ data: rooms, rooms_count: roomsCnt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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

export async function roomsLikeController(req, res) {
  try {
    const result = await roomService.likeRooms(req.userId, req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function roomsRoomController(req, res) {
  try {
    const result = await roomService.getRoomOfRooms(req.params.id, {
      start_date: req.query.start_date,
      end_date: req.query.end_date,
    });

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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

export async function roomsPaymentController(req, res) {
  const { name, phone_number, email, number, start_date, end_date } = req.body;
  const room_id = req.query.room_id;
  try {
    await roomService.paymentOfBooking(1, room_id, {
      name,
      phone_number,
      email,
      number,
      start_date,
      end_date,
    });
    res.status(201).json({ message: '예약이 완료되었습니다.' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
