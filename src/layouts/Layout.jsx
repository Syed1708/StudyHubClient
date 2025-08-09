// src/layouts/Layout.jsx
import { Outlet, useLocation, useNavigation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Loading1 from "../components/Loading1";
import Loading2 from "../components/Loading2";

const Layout = () => {
  const { state } = useNavigation();

  const DynamicTitle = () => {
    const location = useLocation();

    useEffect(() => {
      const path = location.pathname;

      const getTitle = () => {
        switch (path) {
          case "/":
            return "Home | 📘 StudyHub";
          case "/login":
            return "Login | 📘 StudyHub";
          case "/register":
            return "Register | 📘 StudyHub";
          case "/sessions":
            return "Sessions | 📘 StudyHub";
          case "/about":
            return "About | 📘 StudyHub";


          default:
            return "📘 StudyHub";
        }
      };

      document.title = getTitle();
    }, [location]);

    return null;
  };
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading1 />
      </div>
    );
  }
  return (
    <div className=" w-11/12 mx-auto">
      <Navbar />
      <DynamicTitle />
      <main className=" bg-base-50 shadow-sm">
        {state == "loading" ? <Loading2></Loading2> : <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
