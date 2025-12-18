import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import CreateStudentForm from "../components/CreateStudentForm";
import fetchAllStudents from "../services/fetchAllStudents";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [reloadStudents, setReloadStudents] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setMessage("Loading...");
        const allStudents = await fetchAllStudents();
        if (allStudents === 1) {
          setMessage("Something went wrong.");
          toast.error("Something went wrong.");
        }
        if (allStudents === 2) {
          setMessage("Unauthorized. Please login.");
          toast.error("Unauthorized. Please login");
        }

        setStudents(allStudents);
      } catch (error) {
        console.log(error.message || "Unexpected Error");
        setMessage("Error fetching students");
        toast.error("Error fetching students");
      }
    })();
  }, [reloadStudents]);

  return (
    <section>
      <h1>Students:</h1>
      {message ? (
        <p style={styles.dashboardMessage}>{message}</p>
      ) : (
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              <Link to={`/student/${student._id}`}>{student.name}</Link>
            </li>
          ))}
        </ul>
      )}
      {!message && (
        <CreateStudentForm
          onCreation={() => setReloadStudents((state) => state + 1)}
        />
      )}
    </section>
  );
}

export default Dashboard;

const styles = {
  dashboardMessage: {
    fontWeight: 800,
    textAlign: "center",
    fontSize: "1.25rem",
    color: "#FFBF00",
  },
};
