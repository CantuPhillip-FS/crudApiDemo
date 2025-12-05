const deleteAStudent = async ({ id }) => {
  const API_BASE = import.meta.env.VITE_BASE_URL;
  console.log("id >>>", id);
  try {
    const request = await fetch(`${API_BASE}/students/${id}`, {
      method: "DELETE",
    });
    console.log("Request >>>", request);
    return request;
  } catch (error) {
    console.log(error.message || "Unexpected Error");
    return "Unexpected Error";
  }
};

export default deleteAStudent;
