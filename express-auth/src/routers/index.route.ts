import { Router } from "express";
const router = Router();

import authRoute from './auth.route';
import userRoute from './user.route';

router.use('/api/auth', authRoute);
router.use('/api/account', userRoute);

export default router;