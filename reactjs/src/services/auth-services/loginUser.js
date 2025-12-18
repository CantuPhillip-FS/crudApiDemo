import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL;

const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/signin`, {
      email,
      password,
    });
    console.log("LOGIN RESPONSE >>>", response);
    if (!response.status === 200) return null;
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default login;
