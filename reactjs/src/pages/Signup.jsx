import { useState } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(`${email}, ${password}, clicked!`);
      // await service
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          pattern=".{8,}"
          title="Must be at least 8 characters long"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up!</button>
      </form>
    </section>
  );
};

export default Signup;
