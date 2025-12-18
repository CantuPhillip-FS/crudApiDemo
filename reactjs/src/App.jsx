import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Student from "./pages/Student";

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    // const user = AuthService.getCurrentUser();
    (async () => {
      const user = false;
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
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
