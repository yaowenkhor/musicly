import axios from "axios";

export const getSearch = async (q) =>{
    const url = `http://localhost:3000/spotify/search?q=${q}`

    try {
        const response = await axios.get(url);

        if(response.status === 200){
            return response.data.data;
        }else{
            throw new Error(`Unexpected response status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error fetching search items:', error);
        throw error;
    }

}