import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import Layout from "../layouts/Layout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import StudentDashboard from "../pages/Dashboard/Student/StudentDashboard";
import TutorDashboard from "../pages/Dashboard/Tutor/TutorDashboard";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import AdminRoute from "../routes/AdminRoute";
import TutorRoute from "../routes/TutorRoute";
import StudentRoute from "../routes/StudentRoute";
import Forbidden from "../pages/Forbidden";
import CreateSession from "../pages/Dashboard/Tutor/CreateSession";
import MySessions from "../pages/Dashboard/Student/MySessions";
import TutorHome from "../pages/Dashboard/Tutor/TutorHome";
import ApprovedSessions from "../pages/Dashboard/Tutor/ApprovedSessions ";
import UploadMaterial from "../pages/Dashboard/Tutor/UploadMaterial";
import ManageMaterials from "../pages/Dashboard/Tutor/ManageMaterial";
import ManageSession from "../pages/Dashboard/Tutor/ManageSession";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import StudentHome from "../pages/Dashboard/Student/StudentHome";
import ManageUser from "../pages/Dashboard/Admin/ManageUser";
import ManageSessions from "../pages/Dashboard/Admin/ManageSession";
import ManageAdminMaterials from "../pages/Dashboard/Admin/ManageAdminMaterial";
import ManageNotes from "../pages/Dashboard/Student/ManageNotes";
import SessionDetails from "../pages/SessionDetails";
import BookedSessionDetails from "../pages/Dashboard/Student/BookedSessionDetails";
import SessionsPage from "../pages/SessionsPage";
import About from "../pages/About";
import Payment from "../pages/Payment/Payment";
import ProfilePage from "../auth/Profile";
import RejectedSessions from "../pages/Dashboard/Tutor/RejectedSessions";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/sessions",
        Component: SessionsPage,
      },
      {
        path: "/sessions/:id",
        Component: SessionDetails,
      },
      {
        path: "/payment/:sessionId",
        Component: Payment,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "profile",
        Component:ProfilePage
      },
      {
        path: "student",
        element: (
          <StudentRoute>
            <StudentDashboard />
          </StudentRoute>
        ),
        children: [
          {
            index: true,
            Component: StudentHome,
          },
          {
            path: "notes",
            element: <ManageNotes />,
          },
          {
            path: "sessions",
            element: <MySessions></MySessions>,
          },
          {
            path: "bookings/:id",
            element: <BookedSessionDetails />,
          },
        ],
      },
      {
        path: "tutor",
        element: (
          <TutorRoute>
            <TutorDashboard />
          </TutorRoute>
        ),
        children: [
          {
            index: true,
            Component: TutorHome,
          },
          {
            path: "create-session",
            element: <CreateSession />,
          },
          {
            path: "approved-session",
            element: <ApprovedSessions />,
          },
          {
            path: "rejected-session",
            element: <RejectedSessions />,
          },
          {
            path: "upload-material/:sessionId",
            element: <UploadMaterial />,
          },
          {
            path: "manage-meterials",
            element: <ManageMaterials />,
          },
          {
            path: "manage-sessions",
            element: <ManageSession />,
          },
        ],
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
        children: [
          {
            index: true,
            Component: AdminHome,
          },
          {
            path: "users",
            element: <ManageUser />,
          },
          {
            path: "sessions",
            element: <ManageSessions />,
          },
          {
            path: "materials",
            element: <ManageAdminMaterials />,
          },
        ],
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
    ],
  },
  {
    path: "forbidden",
    Component: Forbidden,
  },
]);
