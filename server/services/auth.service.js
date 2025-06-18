import axios from "axios";
import qs from "qs";
import env from 'dotenv';
env.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const auth_token = Buffer.from(`${clientId}:${clientSecret}`, "utf-8").toString(
  "base64"
);

export const getAuth = async () => {
  try {
    const token_url = "https://accounts.spotify.com/api/token";
    const data = qs.stringify({ grant_type: "client_credentials" });

    const response = await axios.post(token_url, data, {
      headers: {
        Authorization: `Basic ${auth_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error fetching Spotify token:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch Spotify token");
  }
};
