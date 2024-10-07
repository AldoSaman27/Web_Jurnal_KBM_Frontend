import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import PageWelcome from "./Pages/Welcome";
import PageDashboard from "./Pages/Dashboard";
// User Pages
import PageLogin from "./Pages/User/Login";
import PageRegister from "./Pages/User/Register";
import PageSettings from "./Pages/User/Settings";
// Jurnal Pages
import PageBuatJurnal from "./Pages/Jurnal/Buat";
import PageLihatJurnal from "./Pages/Jurnal/Lihat";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PageWelcome />} />
                <Route path="/user/login" element={<PageLogin />} />
                <Route path="/user/register" element={<PageRegister />} />
                <Route path="/user/settings" element={<PageSettings />} />
                <Route path="/dashboard" element={<PageDashboard />} />
                <Route path="/jurnal/buat" element={<PageBuatJurnal />} />
                <Route path="/jurnal/lihat" element={<PageLihatJurnal />} />
            </Routes>
        </Router>
    );
}

export default App;
