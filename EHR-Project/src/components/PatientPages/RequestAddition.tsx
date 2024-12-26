import React, { useState } from 'react';
import PatientNavbar from '../Navbar/PatientNavbar';

const RequestDataAddition: React.FC = () => {
  const [dataType, setDataType] = useState('');
  const [issuedDate, setIssuedDate] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ dataType, issuedDate, description, file });
  };

  const handleRemoveFile = () => {
    setFile(null);
    console.log("File removed");
  };

  return (
    <div>
      <PatientNavbar />
      <div className="p-8">
        <h2 className="text-3xl text-blue-600 mb-6">Request Data Addition</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Type</label>
            <input type="text"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              placeholder="Type here"
              className="block w-2/5 p-3 mt-1 border rounded-md focus:ring-indigo-500 focus:border-blue-500 border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Issued Date</label>
            <input
              type="date"
              value={issuedDate}
              onChange={(e) => setIssuedDate(e.target.value)}
              placeholder="Type here"
              className="block w-2/5 p-3 mt-1 border rounded-md focus:ring-indigo-500 focus:border-blue-500 border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type here"
              className="mt-5 block w-2/5 h-40 border border-blue-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-center placeholder:text-center"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload File</label>
            <div className="mt-2">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Choose File
              </label>
              {file && (
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-7 py-2 bg-green-500 text-white rounded-lg border border-black hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestDataAddition;