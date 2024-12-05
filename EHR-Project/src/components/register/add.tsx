import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const Add = () => {
  const [role, setRole] = useState("Doctor"); 
  const navigate = useNavigate();

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };
  

  const handleBack = () => {
    navigate("/register");
  };

  const handleNext = () => {
    if (role === "Doctor") {
      navigate("/add-doctor");
    } else if (role === "Patient") {
      navigate("/add-patient");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg bg-white shadow-lg shadow-slate-800 rounded-lg">
        <div className="border-4 border-[#415BE7] rounded-lg p-8 space-y-8">
          <h2 className="text-3xl text-center text-black-900 my-5">
            Add Doctor/Patient
          </h2>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Role:
            </label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="block w-full p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            >
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-[#415BE7] text-white rounded-md hover:bg-[#263380]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
