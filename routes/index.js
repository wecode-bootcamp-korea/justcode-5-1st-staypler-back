import express from 'express';
import userRouter from './user.js';
import mainRouter from './main.js';
import roomRouter from './room.js';
import myPageRouter from './mypage.js';

const router = express.Router();

router.use(userRouter);
router.use(mainRouter);
router.use(roomRouter);
router.use(myPageRouter);

module.exports = router;
