import axios from "axios";

const API_URL = "http://localhost:8080";

export const loginWithProvider = async (provider: string) => {
  window.location.href = `${API_URL}/auth/${provider}`;
};

export const logout = async (provider: string) => {
  try {
    await axios.get(`${API_URL}/logout/${provider}`, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const res = await axios.get(`${API_URL}/me`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
