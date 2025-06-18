import express from "express";
import env from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/db.js";
env.config();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDatabase();

const port = process.env.PORT;

import spotifyRoutes from "./routes/spotify.route.js";
import youtubeRoutes from "./routes/youtube.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import playlistRoutes from "./routes/playlist.route.js";

app.use(express.json());
app.use("/spotify", spotifyRoutes);
app.use("/youtube", youtubeRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/playlist", playlistRoutes);

app.listen(port, () => {
  console.log("Server is running on", process.env.PORT);
});
