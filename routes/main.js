import express from 'express';
import * as mainController from '../controllers/main.js';

const router = express.Router();

router.get('/promotion', mainController.promotionController);
router.get('/recommend', mainController.recommendController);
router.get('/banner', mainController.bannerController);

export default router;
