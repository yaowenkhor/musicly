import axios from "axios";

export const register = async (formData) => {
  const url = `http://localhost:3000/users/register`;

  try {
    const response = await axios.post(url, formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
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

export const loginAPI = async (formData) => {
  const url = `http://localhost:3000/users/login`;

  try {
    const response = await axios.post(url, formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error posting data", error);
    if (error.response) {
      throw new Error(
        error.response.data.message || "Login failed. Please try again."
      );
    }

    throw new Error("Something went wrong. Please try again.");
  }
};

export const logoutAPI = async () =>{
  const url = `http://localhost:3000/users/logout`;

  try{
    const response = await axios.get(url, {
      withCredentials: true
    })

    if(response.status === 200){
      return {
        status: 200,
        message: response.data.message || "Logout Successfully"
      }; 
    }
  }catch(error){
    console.error("Error: ", error);
    if (error.response) {
      throw new Error(
        error.response.data.message || "Logout failed. Please try again."
      );
    }
  }

}

export const profile = async () => {
  const url = `http://localhost:3000/users/me`;

  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return error.response?.message;
  }
};

export const refresh_token = async () => {
  const url = `http://localhost:3000/auth/refreshToken`;

  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(
      "Error refreshing token:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to refresh token");
  }
};
