import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import PatientNavbar from '../Navbar/PatientNavbar';

const AiHistory: React.FC = () => {
  const [patientId, setPatientId] = useState<string>('');
  const [historyText, setHistoryText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to handle fetching patient history
  const handleGenerateHistory = async () => {
    if (!patientId) {
      toast.error('Please enter a valid Patient ID');
      return;
    }
  
    setIsLoading(true);
    try {
      // Send the patient ID to the AI model endpoint
      const response = await fetch('/api/ai/generate-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setHistoryText(data.answer); 
        toast.success('History generated successfully!');
      } else {
        toast.error(data.message || 'Failed to fetch history');
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      toast.error('An error occurred while fetching history');
    } finally {
      setIsLoading(false);
    }
  };
  // Function to save history as PDF
  const handleSaveAsPdf = () => {
    if (!historyText) {
      toast.error('No history to save');
      return;
    }

    const doc = new jsPDF();
    doc.text(historyText, 10, 10);
    doc.save(`patient-history-${patientId}.pdf`);
    toast.success('History saved as PDF!');
  };

  return (
    <div>
    <PatientNavbar />
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-4xl lg:text-6xl text-center text-blue-700 my-5">
          <span className="block">Generate Summary for Patient History</span>
        </h2>

        {/* Input field and button for generating history */}
        <div className="mt-8">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleGenerateHistory}
                disabled={isLoading}
                className="p-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isLoading ? 'Generating...' : 'Generate History'}
              </button>
            </div>
          </div>

          {/* Display history text */}
          {historyText && (
            <div className="mt-8">
              <h3 className="text-2xl text-blue-700 mb-4">Patient History</h3>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="whitespace-pre-line">{historyText}</p>
              </div>
              <button
                onClick={handleSaveAsPdf}
                className="mt-4 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save as PDF
              </button>
            </div>
            
          )}
        </div>

        {/* React Hot Toast notifications */}
        <Toaster position="top-center" />
      </div>
    </div>
    </div>
  );
};

export default AiHistory;