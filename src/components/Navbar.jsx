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

  const navItems = (
    <>
      <li>
        <NavLink to="/sessions" className="hover:text-blue-700">
          Sessions
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="hover:text-blue-700">
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
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
            className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-white rounded-box w-52 text-gray-700"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-bold text-blue-700 tracking-wide">
          📘 StudyHub
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4 text-md font-medium">
          {navItems}
        </ul>
      </div>

      <div className="navbar-end">
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
                  src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-gray-700 rounded-box z-20 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
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
  );
};

export default Navbar;
