import React from "react";
import { useNavigate } from "react-router-dom";

const AddPatient: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-4 border-[#415BE7] rounded-lg shadow-lg p-8 w-[400px]">
        <h2 className="text-xl mb-6 text-center">Add Patient</h2>
        <form>
          {/* Patient Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First name"
              className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Gender"
              className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="date"
              placeholder="Date of birth"
              className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <input
            type="text"
            placeholder="Address"
            className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />

          {/* Emergency Contact */}
          <h3 className="font-medium mb-2">Emergency Contact</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First name"
              className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
