import { Router } from "express";
import { AuthValidation } from '@/middlewares/authValidation.middleware';
import { AuthController } from '@/controllers/auth.controller';

const router = Router();

router.post('/register', AuthValidation.registerValidation, AuthController.register);
router.post('/login', AuthValidation.loginValidation, AuthController.login);
router.post('/reset', AuthController.resetPassword);
router.post('/passcode', AuthController.sendPasscode);

export default router;
