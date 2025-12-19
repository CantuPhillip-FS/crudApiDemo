import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../context/useAuth";
import login from "../services/auth-services/loginUser";

const Login = () => {
  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login({ email, password });
      if (!response) throw new Error();

      setAuthUser(response);
      toast.success("Welcome! You're logged in");
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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
