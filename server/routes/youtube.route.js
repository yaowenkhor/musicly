import express from 'express';
import { getVideoId } from '../controllers/youtube_search.controller.js';

const router = express.Router();

router.get('/video', getVideoId);

export default router;