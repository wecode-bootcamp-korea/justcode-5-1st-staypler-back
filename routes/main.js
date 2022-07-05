import express from 'express';
import * as mainController from '../controllers/main.js';

const router = express.Router();

router.get('/promotion', mainController.promotion);
router.get('/recommend', mainController.recommend);
router.get('/banner', mainController.banner);

export default router;
