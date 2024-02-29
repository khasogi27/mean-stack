import { Router } from "express";
import authRoute from './auth.route';
import userRoute from './user.route';

const router = Router();

router.use('/api/auth', authRoute);
router.use('/api/account', userRoute);

export default router;