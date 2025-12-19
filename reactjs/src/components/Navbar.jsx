import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import useAuth from "../context/useAuth";
import logoutUser from "../services/auth-services/logoutUser";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logoutUser();
    logout();
    navigate("/");
    toast.success("Successfully logged out.");
  };

  return (
    <header>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
