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
