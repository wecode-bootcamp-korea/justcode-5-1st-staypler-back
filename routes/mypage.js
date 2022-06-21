import express from 'express';
import {
  myPageController,
  myPageUpdateController,
  myPagePasswordUpdateController,
  myPageLikeController,
  myPageBookingController,
} from '../controllers/mypage.js';

const router = express.Router();

router.get('/mypage', myPageController);
router.put('/mypage', myPageUpdateController);
router.put('/mypage/password', myPagePasswordUpdateController);
router.get('/mypage/like', myPageLikeController);
router.get('/mypage/bookings', myPageBookingController);

module.exports = router;
