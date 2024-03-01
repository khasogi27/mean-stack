import { Router } from "express";
import { CreateJsonWebToken } from '@/middlewares/auth.middleware';
import { UserController } from "@/controllers/user.controller";

const router = Router();

router.get('/users', CreateJsonWebToken.createJwt, UserController.usersList);
router.get('/profile', CreateJsonWebToken.createJwt, UserController.userProfile);
router.delete('/user/delete', CreateJsonWebToken.createJwt, UserController.removeUser);
router.delete('/users/delete', CreateJsonWebToken.createJwt, UserController.removeAllUser);

export default router;