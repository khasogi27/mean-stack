
import { Router } from "express";
const router = Router();

import { registerValidation, loginValidation } from '../middlewares/authValid.middleware';
import { register, login, userProfile, usersList, removeUser } from '../controllers/auth.controller';
import { creteJwt } from '../middlewares/auth.middleware';

// router.post('/register', registerValidation, register);
// router.post('/login', loginValidation, login);
// router.get('/profile/:id', creteJwt, userProfile);
// router.get('/users', creteJwt, usersList);

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:userId', userProfile);
router.get('/users', usersList);
router.delete('/user/:userId', removeUser);

export default router;
