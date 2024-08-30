import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedDataString = localStorage.getItem("auth");
    const storedData = storedDataString ? JSON.parse(storedDataString) : null;

    if (!storedData || !storedData.token || Date.now() > storedData.expiration) {
      if (location.pathname !== "/") {
        localStorage.removeItem("key");
        navigate("/");
      }
    } else {
      const role = storedData.role.toLowerCase();

      if (role === 'projectmanager' && location.pathname !== "/dashboard") {
        navigate("/dashboard");
      } 
    }
  }, [navigate, location.pathname]);
};

export default useAuth;
