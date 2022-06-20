const express = require('express');
const {
  promotionController,
  recommendController,
  bannerController,
} = require('../controllers/main');

const router = express.Router();

router.get('/promotion', promotionController);
router.get('/recommend', recommendController);
router.get('/banner', bannerController);

module.exports = router;
