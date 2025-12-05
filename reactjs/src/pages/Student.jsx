import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import UpdateStudentForm from "../components/UpdateStudentForm";
import deleteAStudent from "../services/deleteAStudent";
import fetchAStudent from "../services/fetchAStudent";

const Student = ({ id }) => {
  id = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    class: "",
    id: "",
  });
  // this state is used to properly re-fetch the student upon new update
  // I learned and did this in the previous class with Brad
  const [reloadStudent, setReloadStudent] = useState(0);

  useEffect(() => {
    const getStudent = async () => {
      try {
        const foundStudent = await fetchAStudent(id);
        if (!foundStudent) {
          return;
        }
        setStudent(foundStudent);
      } catch (error) {
        console.log(error.message);
      }
    };
    getStudent();
  }, [id, reloadStudent]);

  const deleteStudent = async () => {
    try {
      const response = await deleteAStudent(id);
      if (!response.ok) {
        return toast.error("Something went wrong");
      }
      toast.success("Student deleted");
      navigate("/dashboard", { replace: true });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>Student Profile</h1>
      {student ? (
        <>
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Class:</strong> {student.class}
          </p>
          <p>
            <strong>ID:</strong> {student._id}
          </p>
          <button onClick={() => deleteStudent()}>Delete Student</button>
          <UpdateStudentForm
            id={student._id}
            onUpdate={() => setReloadStudent((state) => state + 1)}
          />
        </>
      ) : (
        <p>No student found</p>
      )}
    </section>
  );
};

export default Student;
