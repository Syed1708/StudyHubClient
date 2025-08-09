import axios from "axios";
import React from "react";
import useAuth from "./useAuth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `https://studyflatform.vercel.app`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  // from local storage
  // const token = localStorage.getItem('fb-token');
  // form user cookies
  // const { user, logOut } = useAuth();
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    async (config) => {
      // config.headers.Authorization = `Bearer ${user.accessToken}` 
    //   error show user access token null
      // console.log(config.headers.Authorization);

      const currentUser = getAuth().currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error.status;
      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        signOutUser()
          .then(() => {
            navigate("/login");
          })
          .catch(() => {});
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
