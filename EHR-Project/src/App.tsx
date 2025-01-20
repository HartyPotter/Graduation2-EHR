import { Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/login/Login";
import Register from "./components/register/register";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AddPatientdata from "./components/AddPatient/AddPatient";
import DoctorDashboard from "./components/dashboard/DoctorDashboard";
import PatientDashboard from "./components/dashboard/PatientDashboard";
import PastExaminations from "./components/PatientPages/PastExaminations";
import TestsAndXrays from "./components/PatientPages/TestsAndXrays"
import RequestAddition from "./components/PatientPages/RequestAddition"
import ExaminationsDetails from "./components/PatientPages/ExaminationsDetails"
import History from "./components/PatientPages/History"
import AiHistory from "./components/History/AiHistory";
import Patients from "./components/AddPatient/Patients";
import AddPatient from "./components/AddPatient/AddPatient";
import PatientTable from "./components/DoctorView/PatientTable";
import LandingPage from "./components/LandingPage/LandingPage"; // Import the new LandingPage component
import Callback from "./components/Callback"; // Import the new Callback component

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      <Route path="/callback" element={<Callback />} /> {/* Add the callback route */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/DoctorDashboard" element={<PrivateRoute element={<DoctorDashboard />} />}/>
      <Route path="/AddPatient" element={<PrivateRoute element={<AddPatientdata />} />} />
      <Route path="/PatientDashboard" element={<PrivateRoute element={<PatientDashboard />} />} />
      <Route path="/PastExaminations" element={<PrivateRoute element={<PastExaminations />} />} />
      <Route path="/TestsAndXrays" element={<PrivateRoute element={<TestsAndXrays />} />} />
      <Route path="/RequestAddition" element={<PrivateRoute element={<RequestAddition />} />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/add-patient" element={<AddPatient />} />
      <Route path="/patient-table" element={<PatientTable />} />
      <Route path="/AiHistory" element={<PrivateRoute element={<AiHistory />} />} />
      <Route path="/ExaminationsDetails" element={<PrivateRoute element={<ExaminationsDetails />} />} />
      <Route path="/History" element={<PrivateRoute element={<History />} />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default App;
