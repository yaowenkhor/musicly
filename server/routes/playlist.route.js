import express from "express";

import {
  createPlaylist,
  deletePlaylist,
  deleteSongFromPlaylist,
  addSongToPlaylist,
  getAllPlaylist,
  getPlaylistDetails
} from "../controllers/playlist.controller.js";

import { authenticateUser } from "../middleware/auth.js";
import { authorizeUser } from "../middleware/authorization.js";

const router = express.Router();

router.use(authenticateUser);

router.post('/create', createPlaylist);
router.delete('/delete/:playlistId', authorizeUser, deletePlaylist);
router.put('/add/song/:playlistId', authorizeUser, addSongToPlaylist);
router.put('/delete/song/:playlistId', authorizeUser, deleteSongFromPlaylist);
router.get('/all', getAllPlaylist);
router.get('/:playlistId', authorizeUser, getPlaylistDetails);

export default router;