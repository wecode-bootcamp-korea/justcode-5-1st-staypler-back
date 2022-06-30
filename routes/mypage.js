import express from 'express';
import * as myPageController from '../controllers/mypage.js';
import { validateToken } from '../middleware/authorization.js';

const router = express.Router();

// router.use(validateToken);

router.get('/', myPageController.myPageController);
router.put('/', myPageController.myPageUpdateController);
router.get('/header', myPageController.mypageHeaderController);
router.put('/password', myPageController.updatePassword);
router.get('/like', myPageController.myPageLikeController);
router.get('/bookings', myPageController.myPageBookingController);

export default router;
