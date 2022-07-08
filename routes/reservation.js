import express from 'express';
import * as reservationController from '../controllers/reservation.js';
import { validateToken } from '../middleware/authorization.js';

const router = express.Router();

router.use(validateToken);
router.get('/mypage/bookings', reservationController.reservationList);

export default router;
