import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SidebarRoutes from "./components/AdminController/SidebarRoutes.jsx";
import Login from "./components/Auth/Login.jsx";
import SignUp from "./components/Auth/SignUp.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword.js";
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
              <Route path="/dashboard/*" element={<SidebarRoutes />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
            </Routes>
            <Footer />
          </div>
        </IdolProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
