import express from 'express';
import * as roomController from '../controllers/room.js';
import {
  validateToken,
  validateTokenForRoomsAndRoom,
} from '../middleware/authorization.js';

const router = express.Router();

router.get('/', validateTokenForRoomsAndRoom, roomController.accommodationList);

router.get(
  '/rooms/room/bookings',
  validateToken,
  roomController.reservationInfo
);
router.post('/rooms/payment', validateToken, roomController.payment);
router.get('/rooms/:id/room', roomController.roomDetail);
router.get(
  '/rooms/:id',
  validateTokenForRoomsAndRoom,
  roomController.accommodationDetail
);
router.post('/rooms/:id/like', validateToken, roomController.accommodationLike);

export default router;
