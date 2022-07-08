import express from 'express';
import * as myPageController from '../controllers/mypage.js';
import { validateToken } from '../middleware/authorization.js';

const router = express.Router();

router.use(validateToken);

router.get('/mypage', myPageController.myPage);
router.put('/mypage', myPageController.updateMypage);
router.get('/mypage/header', myPageController.mypageHeader);
router.put('/mypage/password', myPageController.updatePassword);
router.get('/mypage/like', myPageController.wishList);
router.get('/mypage/bookings', myPageController.reservationList);

export default router;
