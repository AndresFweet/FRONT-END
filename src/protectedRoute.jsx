import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "./context/auth/authContext";

function ProtectedRoute() {
  //metodos del context Auth
  const { isAuthenticated, loading } = UseAuth();
  //validar autenticacion
  if (loading) return <h1>Cargando...</h1>
  if (!loading && !isAuthenticated) return <Navigate to="/signin" replace />;
  //valor de retorno
  return (
    <Outlet/>
  )
}

export default ProtectedRoute;
