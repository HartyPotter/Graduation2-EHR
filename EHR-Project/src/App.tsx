import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/login/Login";
import Register from "./components/register/register";
import Add from "./components/register/add";
import AddDoctor from "./components/register/doctor";
import AddPatient from "./components/register/patient";
import Dashboard from "./components/dashboard/dashboard";
import PrivateRoute from "./components/ PrivateRoute/PrivateRoute";
import AddPatientdata from "./components/AddPatient/AddPatient";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add" element={<Add />} />
      <Route path="/add-doctor" element={<AddDoctor />} />
      <Route path="/add-patient" element={<AddPatient />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />}/>
      <Route path="/AddPatient" element={<PrivateRoute element={<AddPatientdata />} />}/>

      <Route path="*" element={<div>Page Not Found</div>} />

    </Routes>
  );
}

export default App;
