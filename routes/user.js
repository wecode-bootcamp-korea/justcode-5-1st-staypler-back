import express from 'express';
import * as userController from '../controllers/user.js';
import { validateToken } from '../middleware/authorization.js';
import { validateUser } from '../middleware/validator.js';
const router = express.Router();

router.post('/signup', validateUser, userController.signUp);
router.post('/login', userController.login);
router.post('/me', validateToken, userController.me);
export default router;
