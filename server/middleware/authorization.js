import Playlist from "../models/playlist.model.js"

export const authorizeUser = async (req, res, next) =>{

    try {
        const {playlistId} = req.params;

        if(!playlistId){
            return res.status(400).json({success: false, message: "Playlist id is required"});
        }

        const playlist = await Playlist.findById(playlistId);

        if(!playlist){
            return res.status(404).json({success: false, message: "Playlist not found"});
        }

        const playlistOwner = playlist.playlistOwner._id;

        if(playlistOwner.toString() !== req.userId){
            return res.status(403).json({success: false, message: "Action unauthorized"})
        }

        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false})
    }

}