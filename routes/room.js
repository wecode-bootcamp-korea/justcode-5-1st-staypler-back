import express from 'express';
import * as roomController from '../controllers/room.js';
import { validateToken } from '../middleware/authorization.js';

const router = express.Router();

router.get('/', roomController.accommodationList);

router.get('/room/bookings', validateToken, roomController.reservationInfo);
router.post('/payment', validateToken, roomController.payment);
router.get('/:id/room', roomController.roomDetail);
router.get('/:id', roomController.accommodationDetail);
router.post('/:id/like', validateToken, roomController.accommodationLike);

export default router;
