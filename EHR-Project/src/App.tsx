import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/login/Login";
import Register from "./components/register/register";
import Add from "./components/register/add";
import AddDoctor from "./components/register/doctor";
import AddPatient from "./components/register/patient";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add" element={<Add />} />
      <Route path="/add-doctor" element={<AddDoctor />} />
      <Route path="/add-patient" element={<AddPatient />} />

      <Route path="*" element={<div>Page Not Found</div>} />

    </Routes>
  );
}

export default App;
