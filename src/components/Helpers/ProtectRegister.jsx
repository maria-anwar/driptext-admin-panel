import { Navigate } from 'react-router-dom';

const ProtectedRegsiter = ({ element,route }) => {
  const storedDataString = localStorage.getItem("key");
  const storedData = storedDataString ? JSON.parse(storedDataString) : null;

  if (storedData && storedData.token && Date.now() <= storedData.expiration) {
    return <Navigate to={route} />;
  }

  return element;
};

export default ProtectedRegsiter;
