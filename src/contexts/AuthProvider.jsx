import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../config/firebase.config";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updatedData);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      // ✅ Wait for server to clear the cookie
      await axios.post(
        "https://studyflatform.vercel.app/logout",
        {},
        { withCredentials: true }
      );

      // ✅ Then sign out from Firebase
      await signOut(auth);
    } catch (error) {
      // console.error("Logout failed:", error);
      toast.error("Login Failed !!")
    } finally {
      setLoading(false);
    }
  };

  const issueJwtToken = async (firebaseUser) => {
    const idToken = await firebaseUser.getIdToken();
    try {
      const res = await axios.post(
        "https://studyflatform.vercel.app/jwt",
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          withCredentials: true,
        }
      );

      // console.log(res.data.token);
      // console.log(idToken);

      return res.data.token;
    } catch (err) {
      // console.error("Failed to issue JWT token:", err);
      toast.error("Failed to issue JWT token: !!")
    }
  };
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const token = await issueJwtToken(currentUser);

          if (token) {
            setUser(currentUser);
            localStorage.setItem("fb-token", token);
          } else {
            setUser(null);
            localStorage.removeItem("fb-token");
          }
        } catch (error) {
          console.error("Faild to issue jwt Token", error);
          setUser(null);
          localStorage.removeItem("fb-token");
        } finally {
          setLoading(false);
        }
      } else {
        // No user signed in
        setUser(null);
        localStorage.removeItem("fb-token");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    googleSignIn,
    signOutUser,
    updateUser,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
