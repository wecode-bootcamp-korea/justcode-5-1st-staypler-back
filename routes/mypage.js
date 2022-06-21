import express from 'express';
import * as myPageController from '../controllers/mypage.js';

const router = express.Router();

router.get('/mypage', myPageController.myPageController);
router.put('/mypage', myPageController.myPageUpdateController);
router.put('/mypage/password', myPageController.myPagePasswordUpdateController);
router.get('/mypage/like', myPageController.myPageLikeController);
router.get('/mypage/bookings', myPageController.myPageBookingController);

export default router;
