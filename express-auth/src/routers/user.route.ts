import { Router } from "express";
import { createJwt } from '@/middlewares/auth.middleware';
import { usersList, removeUser, userProfile } from "@/controllers/user.controller";

const router = Router();

router.get('/users', createJwt, usersList);
router.delete('/user', createJwt, removeUser);
router.get('/profile', createJwt, userProfile);

export default router;