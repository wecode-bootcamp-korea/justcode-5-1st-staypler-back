import express from 'express';
import {
  roomsController,
  roomsDetailController,
  roomsLikeController,
  roomsRoomController,
  roomsBookingInfoController,
  roomsPaymentController,
} from '../controllers/room.js';

const router = express.Router();

router.get('/rooms', roomsController);
router.get('/rooms/:id', roomsDetailController);
router.post('/rooms/:id/like', roomsLikeController);
router.get('/rooms/:id/room', roomsRoomController);
router.get('/rooms/:id/bookings', roomsBookingInfoController);
router.post('/rooms/payment', roomsPaymentController);

module.exports = router;
