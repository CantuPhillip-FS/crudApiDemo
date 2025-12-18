import axios from "axios";

const baseUrl = import.meta.env.BASE_URL;

const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/signin`, {
      email,
      password,
    });
    if (!response.ok) return null;
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default login;
