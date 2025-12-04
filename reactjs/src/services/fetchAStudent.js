const fetchAStudent = async ({ id }) => {
  const API_BASE = import.meta.env.VITE_BASE_URL;
  console.log("id >>>", id);
  try {
    const rawStudents = await fetch(`${API_BASE}/students`);
    const allStudents = await rawStudents.json();
    const findStudentById = allStudents.filter((student) => student._id === id);

    return findStudentById;
  } catch (error) {
    console.log(error.message || "Unexpected Error");
    return "Unexpected Error";
  }
};

export default fetchAStudent;
