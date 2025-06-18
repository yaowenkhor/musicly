import axios from "axios";

export const getVideoId = async (q) =>{
    const url = `http://localhost:3000/youtube/video?q=${q}`;

    try {
        const response = await axios.get(url);

        if(response.status === 200){
            return response.data;
        }else{
            throw new Error(`Unexpected response status: ${response.status}`);
        }

    } catch (error) {
                console.error('Error fetching search items:', error);
        throw error;
    }

}