import express from 'express';
import * as userController from '../controllers/user.js';
import { validateToken } from '../middleware/authorization.js';
const router = express.Router();

router.post(
  '/signup',
  userController.validateUser,
  userController.signupController
);
router.post('/login', userController.loginController);
router.post('/me', validateToken, userController.me);
export default router;
