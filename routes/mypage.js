import express from 'express';
import * as myPageController from '../controllers/mypage.js';
import { validateToken } from '../middleware/authorization.js';

const router = express.Router();

router.get('/', validateToken, myPageController.myPageController);
router.put('/', validateToken, myPageController.myPageUpdateController);
router.put('/password', validateToken, myPageController.updatePassword);
router.get('/like', validateToken, myPageController.myPageLikeController);
router.get(
  '/bookings',
  validateToken,
  myPageController.myPageBookingController
);

export default router;
