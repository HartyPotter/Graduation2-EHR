import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddDoctor: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border-4 border-[#415BE7] rounded-lg shadow-lg p-8 w-[400px]">
                <h2 className="text-xl  mb-6 text-center">Add Doctor</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
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
                    <input
                        type="text"
                        placeholder="Specialization"
                        className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="text"
                        placeholder="License Number"
                        className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
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

export default AddDoctor;
