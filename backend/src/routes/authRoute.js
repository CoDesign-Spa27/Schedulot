import express from 'express'
import { loginUser, me, registerUser } from '../controller/authController.js';

const router=express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/me',me)
export default router;