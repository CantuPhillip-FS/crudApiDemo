import axios from "axios";

const baseUrl = import.meta.BASE_URL;

const signup = async ({ email, password }) => {
  try {
    const response = await axios.post(`${baseUrl}/auth`, { email, password });
    if (!response.ok) return null;
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default signup;
