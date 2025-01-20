import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { PatientData, PatientsResponse } from './PatientInterface';
import AddPatient from './AddPatient';
import EditPatient from './EditPatient';
import PatientDetails from './PatientDetails';

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get<PatientsResponse>('http://localhost:3000/api/patient');
      setPatients(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch patients.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/patient/${id}`);
      toast.success('Patient deleted successfully!');
      fetchPatients();
    } catch (error) {
      toast.error('Failed to delete patient.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <button
        onClick={() => setShowAdd(true)}
        className="mb-4 px-4 py-2 bg-[#415BE7] text-white rounded-md hover:bg-[#263380]"
      >
        Add Patient
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Full Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td className="border border-gray-300 p-2">{patient.full_name}</td>
              <td className="border border-gray-300 p-2">{patient.email}</td>
              <td className="border border-gray-300 p-2">{patient.phone_number}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => {
                    setSelectedPatient(patient);
                    setShowDetails(true);
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    setSelectedPatient(patient);
                    setShowEdit(true);
                  }}
                  className="ml-2 px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(patient._id)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAdd && <AddPatient onClose={() => setShowAdd(false)} />}
      {showEdit && selectedPatient && (
        <EditPatient patient={selectedPatient} onClose={() => setShowEdit(false)} />
      )}
      {showDetails && selectedPatient && (
        <PatientDetails patient={selectedPatient} onClose={() => setShowDetails(false)} />
      )}
    </div>
  );
};

export default Patients;