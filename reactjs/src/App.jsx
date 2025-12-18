import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Student from "./pages/Student";
import getCurrentUser from "./services/auth-services/getCurrentUser.js";

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    (async () => {
      if (user) {
        setCurrentUser(user);
      }
    })();
  }, []);

  return (
    <>
      <Navbar isLoggedIn={currentUser} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} index />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student/:id" element={<Student />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
