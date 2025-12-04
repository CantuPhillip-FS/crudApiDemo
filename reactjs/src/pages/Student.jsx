import { useEffect, useState } from "react";
import { useParams } from "react-router";
import fetchAStudent from "../services/fetchAStudent";

const Student = ({ id }) => {
  id = useParams();
  const [student, setStudent] = useState();

  useEffect(() => {
    const getStudent = async () => {
      try {
        const foundStudent = await fetchAStudent(id);
        console.log("Found Student >>>", foundStudent);
        setStudent(foundStudent);
      } catch (error) {
        console.log(error.message);
      }
    };
    getStudent();
  }, []);
  console.log(student);

  return (
    <div>
      <h1>Student</h1>
      {student !== undefined ? (
        <>
          <p>
            <strong>Name:</strong> {student[0].name}
          </p>
          <p>
            <strong>Class:</strong> {student[0].class}
          </p>
        </>
      ) : (
        <p>No student found</p>
      )}
    </div>
  );
};

export default Student;
