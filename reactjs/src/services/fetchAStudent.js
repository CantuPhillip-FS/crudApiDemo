const fetchAStudent = async ({ id }) => {
  const API_BASE = import.meta.env.VITE_BASE_URL;
  try {
    const rawStudent = await fetch(`${API_BASE}/students/${id}`);
    const foundStudent = await rawStudent.json();

    return foundStudent;
  } catch (error) {
    console.log(error.message || "Unexpected Error");
    return "Unexpected Error";
  }
};

export default fetchAStudent;
