import axios from "axios";

export const getArtist = async (id) =>{
    const url = `http://localhost:3000/spotify/artist/${id}`

    try {
        const response = await axios.get(url);

        if(response.status === 200){
            return response.data.data;
        }else{
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching new releases:', error);
        throw error;
    }

}

export const getArtistTopTracks = async (id) =>{
    const url = `http://localhost:3000/spotify/artist/${id}/top-tracks`;

    try{
        const response = await axios.get(url);

        if(response.status === 200){
            return response.data.data;
        }else{
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    }catch(error){
        console.error('Error fetching new releases:', error);
        throw error;
    }

}

export const getArtistAlbum = async (id) =>{
    const url = `http://localhost:3000/spotify/artist/${id}/album`;

    try {
        const response = await axios.get(url);

        if(response.status === 200){
            return response.data.data;
        }else{
            throw new Error(`Unexpected response status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error fetching artist album:', error);
        throw error;
    }

}