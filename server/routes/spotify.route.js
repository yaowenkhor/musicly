import express from 'express';

import { getNewReleasesAlbum, getAlbumByAlbumId} from '../controllers/album.controller.js';
import { getArtistByArtistId, getArtistAlbum, getArtistTopTracks } from '../controllers/artist.controller.js';
import { search } from '../controllers/search.controller.js';

const router = express.Router();

router.get('/new-releases', getNewReleasesAlbum);
router.get('/album/:album_id', getAlbumByAlbumId);

router.get('/artist/:artist_id', getArtistByArtistId);
router.get('/artist/:artist_id/album', getArtistAlbum);
router.get('/artist/:artist_id/top-tracks', getArtistTopTracks)

router.get('/search', search)

export default router;