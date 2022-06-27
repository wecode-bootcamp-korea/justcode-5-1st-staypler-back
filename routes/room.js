import express from 'express';
import * as roomController from '../controllers/room.js';

const router = express.Router();

router.get('/', roomController.roomsController);
router.get('/room/bookings', roomController.roomsBookingInfoController);
router.get('/:id', roomController.roomsDetailController);
router.post('/:id/like', roomController.roomsLikeController);
router.get('/:id/room', roomController.roomsRoomController);
router.post('/payment', roomController.roomsPaymentController);

export default router;
