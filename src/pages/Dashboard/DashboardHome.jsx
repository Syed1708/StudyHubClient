import useUserRole from "../../hooks/useUserRole";
import Forbidden from "../../pages/Forbidden";
import Loading from "../../components/Loading";
import { Navigate } from "react-router";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role === "student") {
    return <Navigate to="/dashboard/student" replace />;
  } else if (role === "tutor") {
    return <Navigate to="/dashboard/tutor" replace />;
  } else if (role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  } else {
    return <Forbidden />;
  }
};

export default DashboardHome;
