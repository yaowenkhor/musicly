import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  playlistName: {
    type: String,
    required: true,
  },
  playlistDescription: {
    type: String,
    required: true,
  },
  playlistSongs: [
    {
      songID: String,
      songName: String,
      songArtist: [
        {
          artistName: String,
          artistId: String,
        },
      ],
      songImage: String,
    },
  ],
  playlistOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
