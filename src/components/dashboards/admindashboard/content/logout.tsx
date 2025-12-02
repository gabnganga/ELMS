// src/pages/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOut } from "../../../../features/auth/userslice"; // your logout action


const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // 1️⃣ Clear Redux state
    dispatch(logOut());

    // 2️⃣ Clear token from localStorage
    localStorage.removeItem("token");

    // 3️⃣ Immediately show toast
   

    // 4️⃣ Redirect immediately to login
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  return null; // nothing to render, optional spinner
};

export default Logout;
