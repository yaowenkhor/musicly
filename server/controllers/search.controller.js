import axios from "axios";
import { getAuth } from "../services/auth.service.js";

export const search = async (req, res) =>{
    const token = await getAuth();

    const {q} = req.query;

    const url = `https://api.spotify.com/v1/search`;

    try {
        const response = await axios.get(url,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            params:{
                q: q,
                type: 'track,artist,album',
                limit: 15
            }
        })

        const {tracks, artists, albums} = response.data;

        const track_items = tracks?.items || []; 
        const artist_items = artists?.items || [];
        const album_items = albums?.items || [];

        const default_image = 'https://static.thenounproject.com/png/4595376-200.png';

        const track = track_items.map(({id, name, artists, duration_ms, album}) =>{
            const duration_seconds = duration_ms / 1000;
            const minutes = Math.floor(duration_seconds / 60);
            const seconds = Math.floor(duration_seconds % 60);

            const image = album?.images?.[0]?.url || default_image;

            const artist = artists.map(({id: artist_id, name: artist_name}) =>{
                return{
                    artist_id,
                    artist_name
                }
            })

            return{
                track_id: id,
                track_name: name,
                image,
                artist,
                duration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
            }
        })

        const artist = artist_items.map(({id: artist_id, name: artist_names, images}) =>{
            const [images1, images2, images3] = images || [];
            return{
                artist_id,
                artist_names,
                images: [images1, images2, images3]
            }
        })

        const album = album_items.map(({id: album_id, name: album_name, album_type,images}) =>{
            const [images1, images2, images3] = images || [];
            return{
                album_id,
                album_name,
                album_type,
                images: [images1, images2, images3]
            }
        })

        const search_results = {
            track,
            artist,
            album
        }

        res.status(200).json({success: true, data: search_results})

    } catch (error) {
        console.log("Error fetching data", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }

}