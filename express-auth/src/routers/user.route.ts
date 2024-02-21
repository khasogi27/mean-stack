
import { Router } from "express";
const router = Router();

import { usersList, removeUser, userProfile } from "../controllers/user.controller";
import { createJwt } from '../middlewares/auth.middleware';

router.get('/users', createJwt, usersList);
router.delete('/user/:userId', createJwt, removeUser);

router.get('/profile/:userId', createJwt, userProfile);

export default router;