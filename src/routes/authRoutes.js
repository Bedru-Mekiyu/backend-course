import express from 'express';
const router = express.Router();
import { register,login, logout } from '../controllers/authControllers.js';

// Sample route to handle user login

router.post('/register',register);
router.post('/login',login)
router.post('/logout',logout)


export default router;