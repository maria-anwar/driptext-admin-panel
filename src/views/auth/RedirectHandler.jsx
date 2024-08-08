// RedirectHandler.js
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RedirectHandler = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      localStorage.setItem('resetToken', token);
      navigate('/auth/forgetkey'); // Redirect to the desired route
    }
  }, [token, navigate]);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;
