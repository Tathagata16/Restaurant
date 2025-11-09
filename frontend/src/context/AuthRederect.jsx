import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/signup", { replace: true }); // replace prevents back navigation
    }
  }, []);
};

export default useAuthRedirect;
