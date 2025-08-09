import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import registrationAnimation from "../assets/registration.json";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const Register = () => {
  const { createUser, setUser, updateUser } = useAuth() || {};
  const navigate = useNavigate();
  const axios = useAxios()
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, photo, email, password } = data;


    try {
      // Step 1: Register on Firebase
      const result = await createUser(email, password);
      const user = result.user;

      // Step 2: Update Firebase Profile
      await updateUser({ displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });

      // Step 4: Send user to MongoDB via secure API
      await axios.post("/auth/register", {
        name,
        email,
        photoURL: photo,
        role: "student", // default  role
        created_at: new Date().toISOString(),
      });

      toast.success("Registered! Please login now.");
    navigate("/dashboard");
    } catch (error) {
      // console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-around min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">
          Register your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-xs text-error">{errors.name.message}</p>
            )}

            {/* Photo URL */}
            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input"
              placeholder="Photo URL"
              {...register("photo", { required: "Photo URL is required" })}
            />
            {errors.photo && (
              <p className="text-xs text-error">{errors.photo.message}</p>
            )}

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-error">{errors.email.message}</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message:
                    "At least 6 characters, with 1 uppercase and 1 lowercase",
                },
              })}
            />
            {errors.password && (
              <p className="text-xs text-error">{errors.password.message}</p>
            )}

            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>
            <p className="font-semibold text-center pt-5">
              Already Have An Account?{" "}
              <Link className="text-secondary" to="/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
      <Lottie animationData={registrationAnimation} loop={true} />
    </div>
  );
};

export default Register;
