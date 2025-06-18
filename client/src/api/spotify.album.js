import axios from "axios"

export const newRelease = async () => {

    const url = 'http://localhost:3000/spotify/new-releases';

    try {
        const response = await axios.get(url);

        if(response.status === 200){
            return response.data.data
        }else{
            throw new Error(`Unexpected response status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error fetching new releases:', error);
        throw error;
    }
}

export const getAlbum = async (id) =>{

    const url = `http://localhost:3000/spotify/album/${id}`;

    try {
        const response = await axios.get(url);

        if(response.status === 200){
            return response.data.data
        }else{
            throw new Error(`Unexpected response status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error fetching album:', error);
        throw error;       
    }

}


