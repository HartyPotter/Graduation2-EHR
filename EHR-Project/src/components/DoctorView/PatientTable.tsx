import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface Patient {
  _id: string;
  full_name: string;
  email: string;
  gender: string;
  birth_date: string;
  address: string;
  national_id: string;
  phone_number: string;
  insurance_number: string;
}

const PatientTable: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/patient');
      setPatients(response.data);
    } catch (error) {
      toast.error('Failed to fetch patients.');
    }
  };

  const handleAddPatient = () => {
    navigate('/add-patient');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>
      <button
        onClick={handleAddPatient}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Patient
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Full Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Birth Date</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">National ID</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Insurance Number</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td className="py-2 px-4 border-b">{patient.full_name}</td>
              <td className="py-2 px-4 border-b">{patient.email}</td>
              <td className="py-2 px-4 border-b">{patient.gender}</td>
              <td className="py-2 px-4 border-b">{patient.birth_date}</td>
              <td className="py-2 px-4 border-b">{patient.address}</td>
              <td className="py-2 px-4 border-b">{patient.national_id}</td>
              <td className="py-2 px-4 border-b">{patient.phone_number}</td>
              <td className="py-2 px-4 border-b">{patient.insurance_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;