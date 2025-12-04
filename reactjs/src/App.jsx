import { Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Student from "./pages/Student";

function App() {
  return (
    <>
      <Navbar />
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
