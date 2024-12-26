import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

const PatientNavbar: React.FC = () => ( 
<nav className="flex justify-start items-center p-4 border-b border-gray-200">
  <div className="text-blue-600 font-bold text-lg mr-8">EHR PROJECT</div>
    <div className="flex space-x-6">
      <NavLink to="#" className="text-gray-700 hover:text-blue-600">
        History
      </NavLink>
      <NavLink to="#" className="text-gray-700 hover:text-blue-600">
        Hospitals
      </NavLink>
      <NavLink to="#" className="text-gray-700 hover:text-blue-600">
        About us
      </NavLink>
      </div>
    <div className="flex items-center space-x-2 ml-auto">
    <FaBell className="text-gray-700 hover:text-blue-600" />
    <span className="text-gray-700">username</span>
      <img src="profile-placeholder.png" alt="Profile" className="w-7 h-7 rounded-full" />
    </div>
  </nav>
);

export default PatientNavbar;