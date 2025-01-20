import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const { isLoading, isAuthenticated, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Redirect to the home page or dashboard after login
        navigate('/'); // Or '/DoctorDashboard' or '/PatientDashboard' based on user role
      } else if (error) {
        console.error('Authentication error:', error);
        navigate('/login'); // Redirect to login if there's an error
      }
    }
  }, [isLoading, isAuthenticated, error, navigate]);

  return <div>Loading...</div>; // Show a loading spinner while processing
};

export default Callback;