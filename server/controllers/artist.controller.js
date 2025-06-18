import axios from 'axios';
import { getAuth } from '../services/auth.service.js';

export const getArtistByArtistId = async (req, res) => {
    const token = await getAuth();
    const { artist_id } = req.params;

    const url = `https://api.spotify.com/v1/artists/${artist_id}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const { id, name, images = [], genres = [] } = response.data;

        const [images1, images2, images3] = images;
        const genre = genres[0] || '';

        const artist = {
            artist_id: id,
            artist_name: name,
            images: [images1, images2, images3],
            genre
        };

        return res.status(200).json({ success: true, data: artist });

    } catch (error) {
        console.log("Error fetching data", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getArtistAlbum = async (req, res) => {
    const token = await getAuth();
    const { artist_id } = req.params;

    const url = `https://api.spotify.com/v1/artists/${artist_id}/albums`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const { items = [] } = response.data;

        const album = items.map(({ id, name, release_date, images = [], artists = [] }) => {
            const [images1, images2, images3] = images;

            const artist = artists.map(({ id: artist_id, name: artist_name }) => {
                return {
                    artist_id,
                    artist_name
                };
            });

            return {
                album_id: id,
                album_name: name,
                release_date,
                images: [images1, images2, images3],
                artist
            };
        });

        return res.status(200).json({ success: true, data: album });

    } catch (error) {
        console.log("Error fetching data", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getArtistTopTracks = async (req, res) => {
    const token = await getAuth();
    const { artist_id } = req.params;

    const url = `https://api.spotify.com/v1/artists/${artist_id}/top-tracks`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const { tracks = [] } = response.data;

        const track = tracks.map(({ id, name, track_number, artists = [], album, duration_ms }) => {
            const duration_seconds = duration_ms / 1000;
            const minutes = Math.floor(duration_seconds / 60);
            const seconds = Math.floor(duration_seconds % 60);

            const artist = artists.map(({ id: artist_id, name: artist_name }) => {
                return {
                    artist_id,
                    artist_name
                };
            });

            const { images = [] } = album;
            const [images1, images2, images3] = images;

            return {
                track_id: id,
                track_name: name,
                track_number,
                duration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
                artist,
                images: [images1, images2, images3]
            };
        });

        return res.status(200).json({ success: true, data: track });

    } catch (error) {
        console.log("Error fetching data", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};