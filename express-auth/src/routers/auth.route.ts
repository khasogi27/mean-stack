import { Router } from "express";
import { registerValidation, loginValidation } from '@/middlewares/authValidation.middleware';
import { register, login } from '@/controllers/auth.controller';

const router = Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

export default router;
