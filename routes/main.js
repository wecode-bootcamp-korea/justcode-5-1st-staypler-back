import express from 'express';
import {
  promotionController,
  recommendController,
  bannerController,
} from '../controllers/main.js';

const router = express.Router();

router.get('/promotion', promotionController);
router.get('/recommend', recommendController);
router.get('/banner', bannerController);

module.exports = router;
