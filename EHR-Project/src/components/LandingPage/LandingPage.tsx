import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../UserContext';

const LandingPage: React.FC = () => {
  const { isAuthenticated, logout, isLoading: authLoading } = useAuth0();
  const { user, isLoading: userLoading } = useUser();

  if (authLoading || userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Welcome to EHR Project</h1>
        <p className="text-xl mb-8">Your trusted electronic health record system</p>

        {/* Display username and logout button if authenticated */}
        {isAuthenticated && user && (
          <div className="mb-8">
            <p className="text-lg">Welcome, {user.name}!</p>
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="mt-4 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Logout
            </button>
          </div>
        )}

        {/* Show login and register buttons if not authenticated */}
        {!isAuthenticated && (
          <div className="space-x-4">
            <NavLink
              to="/login"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;