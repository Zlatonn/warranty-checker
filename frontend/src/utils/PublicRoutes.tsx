import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = () => {
  // token => can't access to private routes and navigate to "/items"
  // no token => can access to Outlet component
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/items" /> : <Outlet />;
};
export default PublicRoutes;
