import express from 'express';
import mainRouter from './main.js';
import userRouter from './user.js';
import roomRouter from './room.js';
import reservationRouter from './reservation.js';

const router = express.Router();

router.use(mainRouter);
router.use(userRouter);
router.use(roomRouter);
router.use(reservationRouter);

export default router;
