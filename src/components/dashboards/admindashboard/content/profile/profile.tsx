// src/pages/Profile.tsx
import { useState, useEffect } from "react";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store"; // adjust to your store
import { employeesAPI } from "../../../../../features/employees/employeesAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux";
import { logOut } from "../../../../../features/auth/userslice";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [updateEmployee, { isLoading }] = employeesAPI.useUpdatePasswordMutation();

  if (!currentUser) return <p>Loading user info...</p>;

  // Password strength logic
  useEffect(() => {
    if (!password) {
      setPasswordStrength("");
    } else if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (password.length < 10) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      toast.error("Password cannot be empty");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await updateEmployee({
        id: currentUser.Staffid,
        password,
      }).unwrap();

      toast.success("Password updated successfully!");
    dispatch(logOut()); // make sure you have a logout action

    // 2️⃣ Clear token from localStorage/sessionStorage
    localStorage.removeItem("token");

    // 3️⃣ Redirect to login
    setTimeout(() => {
        navigate("/login");
    }, 4000);
    

      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to update password");
    }
  };

  return (
    <div className="max-w-md ml-90 mx-auto mt-20 bg-white shadow p-6 rounded-xl">
      <div className=" flex flex-col items-center space-y-4">
        <FaUserCircle className="text-6xl text-gray-400" />
        <h2 className="text-2xl font-bold">{currentUser.Username}</h2>
        <p className="text-gray-600">{currentUser.Email}</p>
        <p className="text-gray-600 font-semibold">{currentUser.role}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <h3 className="text-lg font-bold">Change Password</h3>

        {/* New Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 pr-10"
          />
          <span
            className="absolute right-2 top-2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Password Strength */}
        {password && (
          <p
            className={`text-sm font-semibold ${
              passwordStrength === "Weak"
                ? "text-red-500"
                : passwordStrength === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            Strength: {passwordStrength}
          </p>
        )}

        {/* Confirm Password Input */}
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
