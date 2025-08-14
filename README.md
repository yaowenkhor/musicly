# 🎵 Musicly - Full Stack Music Streaming Web App

Welcome to Musicly, the music streaming platform that you will love ! <br>
Built using MERN stack and powered by Spotify and Youtube APIs.

## 💡 **Why This Project?** <br>
Musicly is my Spotify-inspired passion project 🎶 — but here’s the twist:  
* No monthly fees 💸
* no annoying ads 🚫
* Pure music streamed from YouTube  

## 🚀 Features
* Music Searching - Search any song, artist, album (just like how you do in Spotify)
* Custom music player - Play any music you like
* Playlists - Create your own playlist
* New Releases - Browse through new release album

This is a personal hobby project — I’ll keep adding features whenever I’m free, so stay tuned 😉

## 🛠️ How to start

### 1. Clone the repository
````bash
git clone https://github.com/yourusername/musicly.git
cd musicly
````

### 2. Install the dependencies 
Backend: 
````bash
cd server
npm install
````

````bash
cd client
npm install
````

### 3. Set up environment variables
Create a `.env` file in the `server` folder with:
````bash
PORT=3000
MONGO_URI=your_mongodb_uri
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
YOUTUBE_API_KEY=your_youtube_api_key
JWT_SECRET=your_jwt_secret
````
### 4. Run the app
Backend:
````bash
cd server
nodemon server.js
````

Frontend:
````bash
cd client
npm run dev
````

Now open your browser and go to:
````bash 
http://localhost:5173/
````
### Now you can enjoy your music without any interruptions !!


