import * as userService from '../services/user.js';

export const validateUser = async (req, res, next) => {
  const { email, password, username, phoneNumber } = req.body;

  if (!email || !password || !username || !phoneNumber) {
    res.status(400).json({ message: 'KEY_ERROR' });
    return;
  }
  next();
};

//회원가입
//controller에서는 오직 request 검증
export const signupController = async (req, res) => {
  try {
    const { email, username, password, phoneNumber } = req.body;

    await userService.signup(email, username, password, phoneNumber);
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//로그인

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.logIn(email, password);

    return res.status(201).json({
      message: 'LOGIN_SUCCESS',
      token: token,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const me = async (req, res) => {
  try {
    await userService.me(req.userId);
    res.status(200).json({ token: req.token });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
