import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const storedDataString = localStorage.getItem("auth");
  const storedData = storedDataString ? JSON.parse(storedDataString) : null;
  
  if (!storedData || !storedData.token || Date.now() > storedData.expiration) {
    localStorage.removeItem("auth");
    return window.open("https://driptext-app.vercel.app", "_self");
  }

  if (allowedRoles && !allowedRoles.includes(storedData.role.toLowerCase())) {
    localStorage.removeItem("auth");
    return window.open("https://driptext-app.vercel.app", "_self");
  }

  return element;
};

export default ProtectedRoute;
