import express from 'express';
import * as myPageController from '../controllers/mypage.js';
import { validateToken } from '../middleware/authorization.js';

const router = express.Router();

router.use(validateToken);

router.get('/', myPageController.myPage);
router.put('/', myPageController.updateMypage);
router.get('/header', myPageController.mypageHeader);
router.put('/password', myPageController.updatePassword);
router.get('/like', myPageController.wishList);
router.get('/bookings', myPageController.reservationList);

export default router;
