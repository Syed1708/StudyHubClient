
import { NavLink } from "react-router";
import { motion } from "framer-motion";

export default function ErrorPage() {
  return (
    <>
  

      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white p-10 rounded-6xl shadow-xl text-center max-w-xl w-full"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-extrabold text-red-600 mb-4"
          >
            Oops! Something went wrong
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-500 text-lg mb-8"
          >
            Nothing was found. Please try again later.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <NavLink to="/">
              <button className="btn btn-primary px-6 py-2 text-white font-semibold rounded-md shadow hover:scale-105 transition-transform duration-200">
                Go Back Home
              </button>
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
