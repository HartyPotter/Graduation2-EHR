import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import PatientNavbar from '../Navbar/PatientNavbar';

interface Examination {
  id: number;
  type: string;
  date: Date;
  doctor: string;
}

const PastExaminations: React.FC = () => {
  const [examinations, setExaminations] = useState<Examination[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const examinationsPerPage = 10;
  const userId = 1;

  useEffect(() => {
  const fetchExaminations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3001/api/patient/visits", {
        withCredentials: true
      });
      setExaminations(response.data);
    } catch (error) {
      setError('Failedddd');
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchExaminations();
}, []); // Ensure userId is used if it's dynamic or essential for fetching data.


  const indexOfLastExamination = currentPage * examinationsPerPage;
  const indexOfFirstExamination = indexOfLastExamination - examinationsPerPage;
  const currentExaminations = examinations.slice(indexOfFirstExamination, indexOfLastExamination);

  const totalPages = Math.ceil(examinations.length / examinationsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <PatientNavbar />
      <div className="p-8">
        <h2 className="text-3xl text-blue-600 mb-6">Past Examinations</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              {examinations.length} Examinations
            </span>
            <div className="flex space-x-2">
              <button className="text-gray-700 hover:text-blue-600">Export</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                + Request Examination
              </button>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            <button className="ml-2 text-gray-700 hover:text-blue-600">Filters</button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b py-2">Examination ID</th>
                <th className="border-b py-2">Examination Type</th>
                <th className="border-b py-2">Date</th>
                <th className="border-b py-2">Doctor Name</th>
                <th className="border-b py-2"></th>
              </tr>
            </thead>
            <tbody>
              {currentExaminations.map((exam) => (
                <tr key={exam.id}>
                  <td className="border-b py-2">{exam.id}</td>
                  <td className="border-b py-2">{exam.type}</td>
                  <td className="border-b py-2">{exam.date.toLocaleDateString()}</td>
                  <td className="border-b py-2">{exam.doctor}</td>
                  <td className="border-b py-2">
                  <NavLink
                    to="/ExaminationsDetails"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg border border-black hover:bg-green-700">
                      Explore
                  </NavLink>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <span>Page {currentPage} of {totalPages}</span>
            <div className="flex space-x-2">
              <button onClick={handlePrevious} className="text-gray-700 hover:text-blue-600" disabled={currentPage === 1}>
                Previous
              </button>
              <button onClick={handleNext} className="text-gray-700 hover:text-blue-600" disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastExaminations;
