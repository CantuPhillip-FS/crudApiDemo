import axios from "axios";
import authHeader from "./authHeader";

const API_BASE = import.meta.env.VITE_BASE_URL;

const getAllPrivateStudents = async () => {
  const response = await axios.get(`${API_BASE}/students`, {
    headers: authHeader(),
  });
  return response.data;
};

const studentsService = {
  getAllPrivateStudents,
};

export default studentsService;
