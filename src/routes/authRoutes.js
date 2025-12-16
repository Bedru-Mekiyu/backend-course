import express from 'express';
const router = express.Router();
import { register } from '../controllers/authControllers.js';
// Sample route to handle user login

router.post('/register',register);

export default router;