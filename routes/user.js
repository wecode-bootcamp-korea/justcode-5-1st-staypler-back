import express from 'express';
import * as userController from '../controllers/user.js';
import { validateUser } from '../middleware/validator.js';
const router = express.Router();

router.post('/users/signup', validateUser, userController.signUp);
router.post('/users/login', userController.login);
export default router;
