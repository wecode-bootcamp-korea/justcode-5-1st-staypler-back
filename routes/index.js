const express = require('express');

const userRouter = require('./user');
const mainRouter = require('./main');
const roomRouter = require('./room');
const myPageRouter = require('./mypage');

const router = express.Router();

router.use(userRouter);
router.use(mainRouter);
router.use(roomRouter);
router.use(myPageRouter);

module.exports = router;
