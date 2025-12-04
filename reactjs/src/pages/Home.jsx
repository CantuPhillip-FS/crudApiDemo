import { useEffect, useState } from "react";
import { Link } from "react-router";
import fetchAllStudents from "../services/fetchAllStudents";

function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudents = async () => {
    setLoading(true);
    try {
      const allStudents = await fetchAllStudents();
      console.log("allStudents >>>", allStudents);

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
            <li key={index}>
              <Link to={`/student/${student._id}`}>{student.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Home;
