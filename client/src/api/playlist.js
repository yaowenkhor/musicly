import axios from "axios";

export const create = async (name, description, owner) => {
  const url = "http://localhost:3000/playlist/create";

  try {
    const response = await axios.post(
      url,
      {
        playlistName: name,
        playlistDescription: description,
        playlistOwner: owner,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error posting data", error);
    throw error.response?.data?.message;
  }
};

export const getAllPlaylist = async (user_id) => {
  const url = "http://localhost:3000/playlist/all";

  try {
    const response = await axios.get(url, {
      params: { user: user_id },
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error posting data", error);
    throw error.response?.data?.message;
  }
};

export const deletePlaylist = async (playlist_id) => {
  const url = `http://localhost:3000/playlist/delete/${playlist_id}`;

  try {
    const response = await axios.delete(url, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error posting data", error);
    throw error.response?.data?.message;
  }
};

export const getPlaylistDetails = async (playlist_id) => {
  const url = `http://localhost:3000/playlist/${playlist_id}`;

  try {
    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error posting data", error);
    throw error.response?.data?.message;
  }
};

export const addSongToPlaylist = async (playlist_id, songData) => {
  const url = `http://localhost:3000/playlist/add/song/${playlist_id}`;

  try {
    const response = await axios.put(
      url,
      {
        playlistId: playlist_id,
        song: songData,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error posting data", error);
    throw error.response?.data?.message;
  }
};

export const deleteSongFromPlaylist = async (playlist_id, track_id) => {
  const url = `http://localhost:3000/playlist/delete/song/${playlist_id}`;

  try {
    const response = await axios.put(
      url,
      {
        playlistId: playlist_id,
        songID: track_id,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error posting data", error);
    throw error.response?.data?.message;
  }
};
