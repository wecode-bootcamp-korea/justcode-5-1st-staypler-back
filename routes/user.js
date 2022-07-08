import express from 'express';
import * as userController from '../controllers/user.js';
import { validateUser } from '../middleware/validator.js';
import { validateToken } from '../middleware/authorization.js';

const router = express.Router();

router.post('/users/signup', validateUser, userController.signUp);
router.post('/users/login', userController.login);
router.get('/mypage', validateToken, userController.myPage);
router.put('/mypage', validateToken, userController.updateMypage);
router.get('/mypage/header', validateToken, userController.mypageHeader);
router.put('/mypage/password', validateToken, userController.updatePassword);
export default router;
