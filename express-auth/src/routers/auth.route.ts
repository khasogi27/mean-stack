import { Router } from "express";
const router = Router();

import { registerValidation, loginValidation } from '../middlewares/authValidation.middleware';
import { register, login } from '../controllers/auth.controller';

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

export default router;
