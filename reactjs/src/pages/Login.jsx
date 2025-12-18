import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import login from "../services/auth-services/loginUser.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      console.log(`${email}, ${password}, clicked!`);
      const response = await login(user);
      if (!response) throw new Error();
      toast.success("Welcome! You're Logged in");
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
          value={password}
          required
        />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
