import axios from "axios";
import env from 'dotenv';
env.config();

export const getVideoId = async (req, res) =>{
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search`
    const {q} = req.query;

    try {
        const response = await axios.get(url,{
            params:{
                key: API_KEY,
                q: q,
                part: 'snippet',
                maxResults: 1
            }
        });
    
        const {items} = response.data;
        const {id} = items[0];
        const{videoId} = id;
    
        return res.status(200).json(videoId);

    } catch (error) {

        console.log("Error fetching data", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }




}