import * as roomService from '../services/room.js';

export async function accommodationList(req, res) {
  try {
    const [data, maxPage] = await roomService.accommodationList(
      req.userId,
      req.query
    );
    res.status(200).json({ data, maxPage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function accommodationDetail(req, res) {
  try {
    const result = await roomService.accommodationById(
      req.userId,
      req.params.id,
      {
        start_date: req.query.start_date,
        end_date: req.query.end_date,
      }
    );
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
}

export async function accommodationLike(req, res) {
  try {
    const result = await roomService.accommodationLike(
      req.userId,
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function roomDetail(req, res) {
  try {
    const data = await roomService.roomById(req.params.id, {
      start_date: req.query.start_date,
      end_date: req.query.end_date,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function reservationInfo(req, res) {
  try {
    const data = await roomService.reservationInfo(
      req.query.room_id,
      req.userId,
      {
        start_date: req.query.start_date,
        end_date: req.query.end_date,
      }
    );
    data[0].start_date = req.query.start_date;
    data[0].end_date = req.query.end_date;
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function payment(req, res) {
  const { name, phone_number, email, number, start_date, end_date } = req.body;
  const room_id = req.query.room_id;
  try {
    await roomService.payment(req.userId, room_id, {
      name,
      phone_number,
      email,
      number,
      start_date,
      end_date,
    });
    res.status(201).json({ message: '????????? ?????????????????????.' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function wishList(req, res) {
  try {
    const page = req.query.page ? req.query.page : 1; // ???????????? ?????? ?????????
    const getImageAll = req.query.getImageAll; // ?????? ???????????? ?????? ??????
    const count = req.query.count;
    const userId = req.userId; // ?????? ?????? ???
    const resData = await roomService.getWishList({
      page,
      count,
      userId,
      getImageAll,
    });
    return res.status(200).json(resData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
