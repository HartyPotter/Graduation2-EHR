import React from 'react';
import { PatientData } from './PatientInterface';

interface PatientDetailsProps {
  patient: PatientData; // Add this prop
  onClose: () => void; // Add this prop
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
        <div className="space-y-4">
          <p><strong>Full Name:</strong> {patient.full_name}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>Phone:</strong> {patient.phone_number}</p>
          <p><strong>Address:</strong> {patient.address}</p>
          <p><strong>Emergency Contact:</strong> {patient.contact.contact_name}</p>
          {/* Add other fields here */}
        </div>
        <button
          onClick={onClose} // Use the onClose prop
          className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;