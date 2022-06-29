import express from 'express';
import * as myPageController from '../controllers/mypage.js';
import { validateToken } from '../middleware/authorization.js';

const router = express.Router();

router.get('/', validateToken, myPageController.myPageController);
router.put('/', validateToken, myPageController.myPageUpdateController);
router.put(
  '/mypage/password',
  validateToken,
  myPageController.myPagePasswordUpdateController
);
router.get(
  '/mypage/like',
  validateToken,
  myPageController.myPageLikeController
);
router.get(
  '/mypage/bookings',
  validateToken,
  myPageController.myPageBookingController
);

export default router;
