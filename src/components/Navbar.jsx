import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, signOutUser } = useAuth() || {};
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await signOutUser();
      toast.success("Successfully Logged Out");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // Public routes
  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/sessions", label: "Sessions" },
    { to: "/about", label: "About Us" }
  ];

  // Protected routes (only for logged in)
  const protectedLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/profile", label: "Profile" }
  ];

  const renderLinks = (links) =>
    links.map(({ to, label }) => (
      <li key={to}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `hover:text-blue-700 ${isActive ? "text-blue-700 font-semibold" : ""}`
          }
        >
          {label}
        </NavLink>
      </li>
    ));

  // Combine links
  const navItems = user
    ? [...publicLinks, ...protectedLinks] 
    : publicLinks;

  return (
    <nav className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="navbar">
          {/* Navbar Start */}
          <div className="navbar-start">
            {/* Mobile Menu Button */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52 text-gray-700 dark:text-gray-200"
              >
                {renderLinks(navItems)}
                {user ? (
                  <li>
                    <button onClick={handleLogOut} className="hover:text-red-500">
                      Log Out
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                      <NavLink to="/register">Register</NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <Link to="/" className="text-2xl font-bold text-blue-700 dark:text-blue-400 tracking-wide">
              📘 StudyHub
            </Link>
          </div>

          {/* Navbar Center (Desktop) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-4 text-md font-medium">
              {renderLinks(navItems)}
            </ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end hidden lg:flex">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full ring ring-blue-400 ring-offset-2">
                    <img
                      alt="User Avatar"
                      src={
                        user?.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-box z-20 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Log Out</button>
                  </li>
                </ul>
              </div>
            ) : (
              <ul className="menu menu-horizontal px-1 space-x-4 text-md font-medium">
                <li>
                  <NavLink to="/login" className="hover:text-blue-700">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="hover:text-blue-700">
                    Register
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
