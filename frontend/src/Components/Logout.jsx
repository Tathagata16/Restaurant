import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1️⃣ Remove token
    localStorage.removeItem("token");

    // 2️⃣ Optionally clear other user data
    localStorage.removeItem("user");

    // 3️⃣ Redirect to login/signup page
    navigate("/admin/login");
  };

  return (
    <button 
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default Logout;
