import axios from 'axios';
import { getAuth } from '../services/auth.service.js';


//Get new release album 
export const getNewReleasesAlbum = async (req, res) => {
    const token = await getAuth();
    const url = 'https://api.spotify.com/v1/browse/new-releases';

    try {
        const response = await axios.get(url,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            params:{
                limit: 50,
                offset: 0
            }
        })

        const {items} = response.data.albums;

        const albums = items.map(({id, name, album_type, total_tracks, artists, images}) => {
            const [images1, images2, images3] = images;

            const artist = artists.map(({id: artist_id, name: artist_name}) =>{
                return{
                    artist_id,
                    artist_name
                }
            })

            return{
                albums_id: id,
                albums_name: name,
                album_type,
                total_tracks,
                artist,
                images:[images1, images2, images3]
            };
        });

        return res.status(200).json({success: true, data: albums});

    } catch (error) {
        console.log("Error fetching data", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
//Get album by album ID
export const getAlbumByAlbumId = async (req, res) =>{
    const token = await getAuth();
    const {album_id} = req.params;

    const url = `https://api.spotify.com/v1/albums/${album_id}`;

    try {
        const response = await axios.get(url,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })

        const {id ,name, release_date, total_tracks, tracks, artists,images} = response.data;

        const{name: artist_name, id: artist_id} = artists[0]
        const [images1, images2, images3] = images;

        const {items} = tracks;

        const track = items.map(({id: track_id , name: track_name, duration_ms, artists}) =>{
            const duration_seconds = duration_ms / 1000;
            const minutes = Math.floor(duration_seconds / 60);
            const seconds = Math.floor(duration_seconds % 60);

            const artist = artists.map(({id: artist_id, name: artist_name}) =>{
                return{
                    artist_id,
                    artist_name
                }
            })

            return{
                track_id,
                track_name, 
                artist,
                duration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
            };
        })

        const album = {
            album_id: id,
            album_name: name,
            release_date,
            total_tracks,
            artist_name,
            artist_id,
            images:[images1, images2, images3],
            track
        }

        return res.status(200).json({success: true, data:album});

    } catch (error) {
        console.log("Error fetching data", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}



