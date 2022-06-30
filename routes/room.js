import express from 'express';
import * as roomController from '../controllers/room.js';
import { validateToken } from '../middleware/authorization.js';

const router = express.Router();

router.get('/', roomController.roomsController);

router.get(
  '/room/bookings',
  validateToken,
  roomController.roomsBookingInfoController
);
router.get('/room', roomController.roomsRoomController);
router.post('/payment', validateToken, roomController.roomsPaymentController);
router.get('/:id/room', roomController.roomsRoomController);
router.get('/:id', roomController.roomsDetailController);
router.post('/:id/like', validateToken, roomController.roomsLikeController);

export default router;
