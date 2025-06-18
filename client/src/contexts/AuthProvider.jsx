import { useState, useContext, createContext, useEffect } from "react";
import { logoutAPI, profile, refresh_token } from "../api/user.auth";
import { getAllPlaylist } from "../api/playlist";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used with a provider");
  }

  return authContext;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const verifyAccessToken = async () => {
      try {
        setLoading(true);
        const data = await profile();
        setUser(data.user);
        setToken(data.accessToken);

        if (data.user?._id) {
          await fetchPlaylists(data.user?._id);
        }
      } catch (error) {
        if (
          error.response.status === 401 &&
          error.response.data.message === "Invalid or expired access token"
        ) {
        const newToken = await refreshAccessToken();
        const data = await profile();

          setUser(data.user);
          setToken(newToken);

          if (data.user?._id) {
            await fetchPlaylists(data.user?._id);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    if (!token && !user) {
      verifyAccessToken();
    }
  }, [token, user]);

  const refreshAccessToken = async () => {
    try {
      const response = await refresh_token();
      return response.accessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error.message);
      throw error;
    }
  };

  const fetchPlaylists = async (userId) => {
    try {
      const response = await getAllPlaylist(userId);
      setPlaylist(response.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const loginAuth = async (user, token) => {
    setToken(token);
    setUser(user);
    if (user.id) {
      await fetchPlaylists(user.id);
    }
  };

  const logout = async () => {
    try {
      const response = await logoutAPI();

      if (response.status === 200) {
        setToken(null);
        setUser(null);
        setPlaylist([]);
        return response.message;
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
      throw new Error("Failed to logout. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAuth, logout, loading, playlist, fetchPlaylists }}>
      {children}
    </AuthContext.Provider>
  );
};
