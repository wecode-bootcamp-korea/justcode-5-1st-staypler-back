import express from 'express';
import * as userController from '../controllers/user.js';

const router = express.Router();

router.post('/signup', userController.signupController);
router.post('/login', userController.loginController);

export default router;
