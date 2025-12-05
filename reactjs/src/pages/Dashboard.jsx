import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import CreateStudentForm from "../components/CreateStudentForm";
import fetchAllStudents from "../services/fetchAllStudents";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  // this state is used to properly re-fetch the students upon new creations
  // I learned and did this in the previous class with Brad
  const [reloadStudents, setReloadStudents] = useState(0);

  const getStudents = async () => {
    setLoading(true);
    try {
      const allStudents = await fetchAllStudents();

      setStudents(allStudents);
    } catch (error) {
      console.log(error.message || "Unexpected Error");
      toast.error("Error fetching students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, [reloadStudents]);

  return (
    <section>
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
      <CreateStudentForm
        onCreation={() => setReloadStudents((state) => state + 1)}
      />
    </section>
  );
}

export default Dashboard;
