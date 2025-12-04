import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // const API_BASE =
  //   import.meta.env.NODE_ENV === "development"
  //     ? `http://localhost:8000`
  //     : import.meta.env.VITE_BASE_URL;
  const API_BASE = import.meta.env.BASE_URL;

  const getStudents = async () => {
    setLoading(true);
    try {
      const rawStudents = await fetch(`${API_BASE}/students`);
      console.log("Fetch >>>", rawStudents);

      const allStudents = await rawStudents.json();
      console.log("Parsed >>>", allStudents);

      setStudents(allStudents);
      console.log("State >>>", students);
    } catch (error) {
      console.log(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getStudents();
    }
  }, []);

  return (
    <main>
      <h1>Students:</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {students.map((student, index) => (
            <li key={index}>{student.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
