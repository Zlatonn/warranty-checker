import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // token => can access to Outlet component
  // no token => can't access to private routes and navigate to "/home"
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/home" />;
};
export default PrivateRoutes;
