import express from 'express';
const router = express.Router();
import {addToWatchlist,removeFromWatchlist} from '../controllers/watchlistControllers.js'
import { authMiddleware } from '../middleware/authmiddlware.js';

// Sample route to handle user login
router.use(authMiddleware)

router.post('/',addToWatchlist);

router.post('/:id',removeFromWatchlist);

// router.post('/login',login)
// router.post('/logout',logout)


export default router;