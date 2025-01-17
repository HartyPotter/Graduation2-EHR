import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { PatientData } from './PatientInterface';

interface EditPatientProps {
  patient: PatientData; // Add this prop
  onClose: () => void; // Add this prop
}

const EditPatient: React.FC<EditPatientProps> = ({ patient: initialPatient, onClose }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<PatientData>(initialPatient);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/patient/${id}`);
        setPatient(response.data);
      } catch (error) {
        toast.error('Failed to fetch patient data.');
      }
    };
    fetchPatient();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in patient) {
      setPatient({ ...patient, [name]: value });
    } else {
      setPatient({
        ...patient,
        contact: { ...patient.contact, [name]: value },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/patient/${id}`, patient);
      if (response.status === 200) {
        toast.success('Patient updated successfully!');
        onClose(); // Close the modal
        navigate('/patients');
      } else {
        toast.error('Failed to update patient.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the patient.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
        <div className="border-4 border-[#415BE7] rounded-lg p-8 space-y-8">
          <h2 className="text-3xl text-center text-black-900 my-5">Edit Patient</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Details */}
            <h3 className="text-xl font-bold text-gray-800">User Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={patient.full_name}
                  onChange={handleChange}
                  className="block w-full p-3 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                />
              </div>
              {/* Add other user fields here */}
            </div>

            {/* Contact Details */}
            <h3 className="text-xl font-bold text-gray-800">Contact Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact_name" className="block text-sm font-medium text-gray-700">Contact Name</label>
                <input
                  type="text"
                  name="contact_name"
                  value={patient.contact.contact_name}
                  onChange={handleChange}
                  className="block w-full p-3 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                />
              </div>
              {/* Add other contact fields here */}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose} // Use the onClose prop
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full px-4 py-3 text-white bg-[#415BE7] rounded-md hover:bg-[#263380]"
              >
                Update Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPatient;