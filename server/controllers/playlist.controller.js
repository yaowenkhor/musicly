import Playlist from "../models/playlist.model.js";

export const createPlaylist = async (req, res) =>{
    try {
        const {playlistName, playlistDescription, playlistOwner} = req.body;

        const playlist = new Playlist({playlistName, playlistDescription, playlistOwner});

        await playlist.save();

        return res.status(201).json({success: true, message: "Playlist successfully created "});

    } catch (error) {
        console.error(error);
        return res.status(400).json({success: false, message: "Error 400: Playlist is not created"});
    }
}

export const addSongToPlaylist = async (req, res) =>{
    try {
        const {playlistId, song} = req.body;

        const playlist = await Playlist.findById(playlistId);
        
        const isDuplicate = playlist.playlistSongs.some(existingSong => 
            existingSong.songID === song.songID
        );
        
        if (isDuplicate) {
            return res.status(400).json({
            success: false, 
            message: "This song already exists in the playlist"
            });
        }

        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            playlistId,
            {$push: {playlistSongs: song}},
            {new: true}
        );

        return res.status(200).json({success: true, message: "Song has successfully added", data: updatedPlaylist});


    } catch (error) {
        console.error(error);
        return res.status(400).json({success: false})
    }
}

export const deleteSongFromPlaylist = async (req, res) =>{
    try {
        const {playlistId, songID} = req.body;

        const deletedSong = await Playlist.findByIdAndDelete(
            playlistId,
            {$pull: {playlistSongs: {songID: songID}}},
            {new: true}
        );

        return res.status(200).json({success: true, message: "Song has successfully deleted", data: deletedSong});

    } catch (error) {
        console.error(error);
        return res.status(400).json({success: false})
    }
}

export const deletePlaylist = async (req, res) =>{
    try {
        const {playlistId} = req.params;

        await Playlist.findByIdAndDelete(playlistId);

        return res.status(200).json({success: true, message: "Playlist has successfully deleted"}); 

    } catch (error) {
        console.error(error);
        return res.status(400).json({success: false})
    }
}

export const getAllPlaylist = async (req, res) =>{
    try {
        const {user} = req.query;

        const allPlaylists = await Playlist.find({playlistOwner: user})

        return res.status(200).json({success: true, data: allPlaylists});

    } catch (error) {
        console.error(error);
        return res.status(400).json({success: false});
    }
}

export const getPlaylistDetails = async (req, res) =>{
    try {
        const {playlistId} = req.params;

        const playlistDetails = await Playlist.findById(playlistId);

        return res.status(200).json({success: true, data: playlistDetails});

    } catch (error) {
        console.error(error);
        return res.status(400).json({success: false});
    }
}