import express from 'express';
import * as mainController from '../controllers/main.js';

const router = express.Router();

router.get('/main/promotion', mainController.promotion);
router.get('/main/recommend', mainController.recommend);
router.get('/main/banner', mainController.banner);

export default router;
