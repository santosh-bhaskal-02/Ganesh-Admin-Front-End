import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import Navbar from "./components/Navbar/Heading.jsx";
import FooterPage from "./components/Footer/FooterPage.jsx";
import DashboardPage from "./components/Pages_Dashboard/DashboardPage.jsx";
import Login from "./components/Authentication/Login.jsx";
import SignUp from "./components/Authentication/SignUp.jsx";
import ForgotPassword from "./components/Authentication/ForgotPassword.jsx";
import LandingPage from "./components/Home/LandingPage.jsx";
import { AuthProvider } from "./components/Context/AuthContext.jsx";
import { IdolProvider } from "./components/Context/IdolContext.jsx";
function App() {
  return (
    <Router>
      <AuthProvider>
        <IdolProvider>
          <Navbar />
          <div className="w-full">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/Dashboard/*" element={<DashboardPage />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
            </Routes>

            <FooterPage />
          </div>
        </IdolProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
