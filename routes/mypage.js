import express from 'express';
import * as userController from '../controllers/user.js';
import * as reservationController from '../controllers/reservation.js';
import * as roomController from '../controllers/room.js';
import { validateToken } from '../middleware/authorization.js';

const router = express.Router();

router.use(validateToken);

router.get('/mypage', userController.myPage);
router.put('/mypage', userController.updateMypage);
router.get('/mypage/header', userController.mypageHeader);
router.put('/mypage/password', userController.updatePassword);
router.get('/mypage/like', roomController.wishList);
router.get('/mypage/bookings', reservationController.reservationList);

export default router;
