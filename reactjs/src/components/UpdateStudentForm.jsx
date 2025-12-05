import { useState } from "react";
import toast from "react-hot-toast";
import updateStudent from "../services/updateStudent";

const UpdateStudentForm = ({ onUpdate, id }) => {
  const [values, setValues] = useState({
    name: "",
    class: "",
  });

  const handleInputChanges = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateStudent(values, id);
      if (!response.ok) {
        toast.error("Something went wrong");
      }
      toast.success("Student updated!");
      onUpdate();
      setValues({
        name: "",
        class: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h2>Update student info:</h2>
      <label htmlFor="name">New Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={values.name}
        onChange={handleInputChanges}
        required
      />
      <label htmlFor="class">New Class:</label>
      <input
        type="text"
        name="class"
        id="class"
        value={values.class}
        onChange={handleInputChanges}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UpdateStudentForm;
