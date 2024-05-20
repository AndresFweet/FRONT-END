import { createContext, useState, useContext, useEffect } from "react";
import { signinRequest, verifyTokenRequest } from "../../api/auth/auth.js";
import Cookies from "js-cookie";
//creacion del contexto
export const AuthContext = createContext();
//funcion para usar el context
export const UseAuth = () => {
  const context = useContext(AuthContext);
  //validar existencias del context
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
//creando el provider (elemento englobador)
export const AuthProvider = ({ children }) => {
  //variables globales
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState([]);
  const [loading, setLoading] = useState(true)
  //funciones (OPERACIONES)
  const signin = async (user) => {
    try {
      const res = await signinRequest(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
      setIsAuthenticated(false);
    }
  };

  //useEffect para eliminar mensajes(errors)
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  //useEffect para validar autenticacion
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ errors, signin, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
