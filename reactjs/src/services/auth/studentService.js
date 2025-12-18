import axios from "axios";
import authHeader from "./authHeader";

const baseURL = import.meta.env.BASE_URL;

const getAllPrivateStudents = async () => {
  return await axios.get(`${baseURL}/students`, { headers: authHeader() });
};

const studentsService = {
  getAllPrivateStudents,
};

export default studentsService;
