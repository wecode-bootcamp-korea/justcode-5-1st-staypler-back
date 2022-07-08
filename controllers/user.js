import * as userService from '../services/user.js';

//회원가입
//controller에서는 오직 request 검증
export const signUp = async (req, res) => {
  try {
    const { email, username, password, phoneNumber } = req.body;

    await userService.signUp(email, username, password, phoneNumber);
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
      status: 201,
    });
  } catch (err) {
    return res
      .status(err.statusCode || 500)
      .json({ message: err.message, status: err.statusCode });
  }
};

//로그인

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);

    return res.status(201).json({
      message: 'LOGIN_SUCCESS',
      token: token,
    });
  } catch (err) {
    return res
      .status(err.statusCode || 500)
      .json({ message: err.message, status: err.statusCode });
  }
};

export async function mypageHeader(req, res) {
  try {
    const data = await userService.getHeader(req.userId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export const updatePassword = async (req, res) => {
  try {
    const { current_password, new_password, confirm_new_password } = req.body;
    const userId = req.userId;
    await userService.updatePassword(
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

export async function updateMypage(req, res) {
  try {
    const { name, phone_number, profile_image } = req.body;
    const userId = req.userId;
    await userService.updateMyPage({
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

export async function myPage(req, res) {
  try {
    const data = await userService.getMyPage(req.userId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
