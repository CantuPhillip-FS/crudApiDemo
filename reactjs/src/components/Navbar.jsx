import { Link } from "react-router";

const Navbar = () => {
  return (
    <header>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/student">Student</Link>
        </li>
      </nav>
    </header>
  );
};

export default Navbar;
