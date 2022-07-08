import * as reservationService from '../services/reservation.js';

export async function reservationList(req, res) {
  try {
    const page = req.query.page ? req.query.page : 1; // 받아오고 싶은 페이지
    const getImageAll = req.query.getImageAll; // 객체 전체사진 조회 여부
    const count = req.query.count;
    const userId = req.userId; // 유저 고유 키
    const resData = await reservationService.getReservationList({
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
