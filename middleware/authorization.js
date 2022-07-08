import jwt from 'jsonwebtoken';
import * as userRepository from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();
const AUTH_ERROR = { message: 'Authentication Error' };
export const validateToken = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.getUserbyId(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user[0].id;
    req.token = token;
    next();
  });
};

export const validateTokenForRoomsAndRoom = async (req, _, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];
  if (token === 'null') {
    req.userId = null;
    next();
  } else {
    const userId = jwt.verify(token, process.env.SECRET_KEY).id;
    req.userId = userId;
    next();
  }
};
