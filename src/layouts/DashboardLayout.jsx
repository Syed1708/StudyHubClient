import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import {
  FaTasks,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaCalendarAlt,
  FaBook,
  FaUsers,
  FaPlusCircle,
  FaTools,
  FaClipboard,
  FaTachometerAlt,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const { user, signOutUser } = useAuth() || {};
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");

  const handleLogOut = async () => {
    try {
      await signOutUser();
      toast.success("Successfully Logged Out");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const DynamicTitle = () => {
    const location = useLocation();

    useEffect(() => {
      const path = location.pathname;

      const getTitle = () => {
        switch (path) {
          case "/dashboard":
            return "Dashboard | 📘 StudyHub";
          case "/dashboard/profile":
            return "Profile | 📘 StudyHub";

          default:
            return "📘 StudyHub";
        }
      };

      document.title = getTitle();
    }, [location]);

    return null;
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <DynamicTitle />
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="navbar bg-base-200 px-4 shadow-xl flex justify-between items-center">
          {/* Left: Drawer toggle on mobile */}
          <div className="flex items-center">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-ghost lg:hidden mr-2"
              aria-label="Toggle Sidebar"
            >
              ☰
            </label>
            <span className="text-xl font-bold hidden md:inline">
              Dashboard
            </span>
          </div>

          {/* Right: Search, Theme, Avatar */}
          <div className="flex items-center gap-3">
            {/* <div className="hidden md:block">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-44"
              />
            </div> */}

            <button onClick={toggleTheme} className="btn btn-ghost text-xl">
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt="User"
                    src={user?.photoURL || "https://i.pravatar.cc/40"}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogOut} className="text-left w-full">
                    <FaSignOutAlt className="inline mr-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 bg-base-100 flex-1">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side min-h-screen">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-base-200 text-base-content space-y-2 min-h-full">
          <h2 className="text-2xl font-bold text-primary mb-6">
            <Link to="/">📘 StudyHub</Link>
          </h2>
          {!roleLoading && role === "student" && (
            <>
              <li>
                <NavLink to="/dashboard/student">
                  <FaTachometerAlt className="inline mr-2" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/student/sessions">
                  <FaCalendarAlt className="inline mr-2" />
                  Booked Sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/student/notes">
                  <FaBook className="inline mr-2" />
                  Manage Notes
                </NavLink>
              </li>
            </>
          )}
          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin">
                  <FaTachometerAlt className="inline mr-2" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/users">
                  <FaUsers className="inline mr-2" />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/sessions">
                  <FaTasks className="inline mr-2" />
                  Manage Sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/materials">
                  <FaClipboard className="inline mr-2" />
                  Manage Materials
                </NavLink>
              </li>
            </>
          )}
          {!roleLoading && role === "tutor" && (
            <>
              <li>
                <NavLink to="/dashboard/tutor/">
                  <FaTachometerAlt className="inline mr-2" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/tutor/approved-session">
                  <FaTools className="inline mr-2" />
                  Approved Sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/tutor/rejected-session">
                  <FaTools className="inline mr-2" />
                  Rejected Sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/tutor/manage-sessions">
                  <FaTools className="inline mr-2" />
                  Manage Sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/tutor/manage-meterials">
                  <FaClipboard className="inline mr-2" />
                  Manage Materials
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
