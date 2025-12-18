import { Link, useNavigate } from "react-router";
import logoutUser from "../services/auth-services/logoutUser.js";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const logout = async () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <button onClick={logout}>Logout</button>
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
