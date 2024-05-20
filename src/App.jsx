import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

//IMPORTANDO LOS CONTEXT DE USUARIO (PROVIDER)
import { AuthProvider } from "./context/auth/authContext.jsx";

//COMPONENT PROTECTOR DE RUTAS
import ProtectedRoute from "./protectedRoute.jsx";

// Import pages
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Home/loginPage";
import RegisterCompany from "./pages/Home/registerCompany";
import RecoverPass from "./pages/Home/recoverPass";
//Dashboard
import Dashboard from "./pages/Dashboard";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <AuthProvider>
      <Routes>
        {/**RUTAS BASICAS */}
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signin" element={<LoginPage />} />
        <Route path="/register" element={<RegisterCompany />} />
        <Route path="/recover" element={<RecoverPass />} />
        {/**RUTAS PROYEGIDAS (REQUIEREN AUTENTICACION) */}

        <Route element={<ProtectedRoute />}>
          {/**RUTAS PARA EL DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
