const fetchAllStudents = async () => {
  const API_BASE = import.meta.env.VITE_BASE_URL;

  try {
    const rawStudents = await fetch(`${API_BASE}/students`);
    console.log("Fetch >>>", rawStudents);

    const allStudents = await rawStudents.json();
    console.log("JSONified >>>", allStudents);

    if (!allStudents || allStudents === "undefined" || allStudents === null) {
      return "No students found";
    }

    return allStudents;
  } catch (error) {
    console.log(error.message || "Unexpected Error");
    return "Unexpected Error";
  }
};

export default fetchAllStudents;
