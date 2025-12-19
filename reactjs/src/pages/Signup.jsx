import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../context/useAuth";
import signup from "../services/auth-services/signupUser";

const Signup = () => {
  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      const response = await signup(user);
      if (!response) throw new Error();
      setAuthUser(response);
      toast.success("Welcome! You're signed up");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setEmail("");
      setPassword("");
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
          value={email}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up!</button>
      </form>
    </section>
  );
};

export default Signup;
