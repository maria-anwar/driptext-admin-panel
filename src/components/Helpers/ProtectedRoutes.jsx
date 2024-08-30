import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const storedDataString = localStorage.getItem("key");
  const storedData = storedDataString ? JSON.parse(storedDataString) : null;

  if (!storedData || !storedData.token || Date.now() > storedData.expiration) {
    localStorage.removeItem("key");
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(storedData.role.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
