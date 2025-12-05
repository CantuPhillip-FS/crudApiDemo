import { useState } from "react";
import toast from "react-hot-toast";
import createAStudent from "../services/createAStudent";

const CreateStudentForm = ({ onCreation }) => {
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
      const response = await createAStudent(values);
      if (!response.ok) {
        toast.error("Something went wrong");
      }
      toast.success("Student created!");
      onCreation();
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
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={values.name}
        onChange={handleInputChanges}
        required
      />
      <label htmlFor="class">Class:</label>
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

export default CreateStudentForm;
