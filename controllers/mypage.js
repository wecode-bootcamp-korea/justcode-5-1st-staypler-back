import * as myPageService from '../services/mypage.js';

export function myPageController(req, res) {}

export function myPageUpdateController(req, res) {}

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

export function myPageLikeController(req, res) {}

export function myPageBookingController(req, res) {}
