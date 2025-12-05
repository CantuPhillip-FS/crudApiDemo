const createAStudent = async (values) => {
  const API_BASE = import.meta.env.VITE_BASE_URL;

  try {
    const response = await fetch(`${API_BASE}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log("Response >>>", response);
    return response;
  } catch (error) {
    console.log(error.message || "Unexpected Error");
    return "Unexpected Error";
  }
};

export default createAStudent;
