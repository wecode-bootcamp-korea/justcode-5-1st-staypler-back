import express from 'express';
import * as roomController from '../controllers/room.js';

const router = express.Router();

router.get('/rooms', roomController.roomsController);
router.get('/rooms/:id', roomController.roomsDetailController);
router.post('/rooms/:id/like', roomController.roomsLikeController);
router.get('/rooms/:id/room', roomController.roomsRoomController);
router.get('/rooms/:id/bookings', roomController.roomsBookingInfoController);
router.post('/rooms/payment', roomController.roomsPaymentController);

export default router;
