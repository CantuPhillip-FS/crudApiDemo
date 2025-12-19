const fetchAllStudents = async (token) => {
  const API_BASE = import.meta.env.VITE_BASE_URL;

  try {
    const rawStudents = await fetch(`${API_BASE}/students`, {
      Authorization: token,
    });
    console.log("Fetch >>>", rawStudents);

    if (!rawStudents.ok) return 1;

    if (rawStudents.statusText === "Unauthorized") {
      return 2;
    }

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
