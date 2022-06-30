import * as myPageService from '../services/mypage.js';

export async function myPageController(req, res) {
  try {
    const data = await myPageService.getMyPage(req.userId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function myPageUpdateController(req, res) {
  try {
    const { name, phone_number, profile_image } = req.body;
    const userId = req.userId;
    await myPageService.updateMyPage({
      userId,
      name,
      phone_number,
      profile_image,
    });
    res.status(200).json({ message: '성공!' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export const updatePassword = async (req, res) => {
  try {
    const { current_password, new_password, confirm_new_password } = req.body;
    const userId = req.userId;
    await myPageService.updatePassword(
      userId,
      current_password,
      new_password,
      confirm_new_password
    );
    res.status(200).json({ message: '비밀번호가 변경되었습니다.' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export async function myPageLikeController(req, res) {
  const page = req.query.page ? req.query.page : 1; // 받아오고 싶은 페이지
  const count = req.query.count ? req.query.count : 5; // 페이지당 객체 개수
  const getImageAll = req.query.getImageAll ? req.query.getImageAll : 1; // 객체 전체사진 조회 여부
  const id = req.userId; // 유저 고유 키
  const resData = await myPageService.getWishRooms({
    page,
    count,
    id,
    getImageAll,
  });

  return res.status(200).json(resData);
}

export async function myPageBookingController(req, res) {
  try {
    const page = req.query.page ? req.query.page : 1; // 받아오고 싶은 페이지
    const count = req.query.count ? req.query.count : 5; // 페이지당 객체 개수
    const getImageAll = req.query.getImageAll ? req.query.getImageAll : 1; // 객체 전체사진 조회 여부
    const id = req.userId; // 유저 고유 키
    const resData = await myPageService.getBookingRooms({
      page,
      count,
      id,
      getImageAll,
    });

    return res.status(200).json(resData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function mypageHeaderController(req, res) {
  try {
    const data = await myPageService.getHeader(req.query.id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
