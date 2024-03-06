import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Welcome from "./Pages/Welcome";
import Dashboard from "./Pages/Dashboard";
// Auth Pages
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
// Jurnal Pages
import BuatJurnal from "./Pages/Jurnal/Buat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jurnal/buat" element={<BuatJurnal />} />
      </Routes>
    </Router>
  );
}

export default App;
