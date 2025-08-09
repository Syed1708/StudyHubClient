
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login.json";
import SocialLogin from "./SocialLogin";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Login = () => {
  
  const { signInUser } = useAuth() || {};
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const from = location.state?.from || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();


  const onSubmit = async (data) => {
  const { email, password } = data;

  try {
    const result = await signInUser(email, password);
 
    if (!result || !result.user) {
      toast.error("Login failed: No user returned.");
      return;
    }

    const user = result.user;

    if (user) {
       const res = await axiosSecure.post("/auth/login", {
      email,
      last_log_in: new Date().toISOString(),
    });

    if (res.data.success) {
      toast.success("Logged in successfully");
      navigate(from);
    } else {
      // toast.error(res.data.message || "Login failed");
      toast.error("Login success failed");
    }   
    }
    // console.log("login user data ",user);


  } catch (error) {
    // console.error("Login Error:", error);
    toast.error("Something went wrong! Check your Credential");
  }
};

  
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">
          Login your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <fieldset className="fieldset">
            {/* email  */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-400 text-xs">Email is required</span>
            )}

            {/* password  */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-400 text-xs">Password is required</span>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

           

            <button type="submit" disabled={isSubmitting} className="btn btn-neutral mt-4">
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
            

            <p className="font-semibold text-center pt-5">
              Dont’t Have An Account ?
              <Link className="text-secondary" to="/register">
                Register
              </Link>
            </p>
          </fieldset>
        </form>

        <SocialLogin />
      </div>
      <div>
        <Lottie animationData={loginAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Login;
