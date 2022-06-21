import express from 'express';
import { signupController, loginController } from '../controllers/user/js';

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);

module.exports = router;
