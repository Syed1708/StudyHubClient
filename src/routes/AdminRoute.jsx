import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();
  if (loading || roleLoading) {
    return <Loading/>
  }

  if (!user || role !== "admin") {
    return (
      <Navigate
        state={{ from: location.pathname }}
        to="/dashboard/forbidden"
      ></Navigate>
    );
  }

  return children;
};

export default AdminRoute;
