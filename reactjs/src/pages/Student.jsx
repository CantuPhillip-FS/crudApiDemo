import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import deleteAStudent from "../services/deleteAStudent";
import fetchAStudent from "../services/fetchAStudent";

const Student = ({ id }) => {
  id = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState();

  useEffect(() => {
    const getStudent = async () => {
      try {
        const foundStudent = await fetchAStudent(id);
        console.log("found student >>>", foundStudent);
        if (!foundStudent) {
          return;
        }
        console.log("Found Student >>>", foundStudent);
        setStudent(foundStudent);
      } catch (error) {
        console.log(error.message);
      }
    };
    getStudent();
  }, [id]);

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
          <button onClick={() => deleteStudent()}>Delete Student</button>
        </>
      ) : (
        <p>No student found</p>
      )}
    </section>
  );
};

export default Student;
