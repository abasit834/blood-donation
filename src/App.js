// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import HomePage from './Components/Home';
import BecomeADonor from './Components/Donor';
import Dashboard from './Components/Dashboard';
import AdminLogin from './Components/AdminLogin';
import ShowDonors from "./Components/ShowDonors";
import ShowRecipents from "./Components/ShowRecipents"
import ProtectedRoute from './Components/ProtectedRoute';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/become-a-donor" element={<BecomeADonor />} />
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/dashboard" element={<ProtectedRoute  Component={Dashboard}/>}/>
        <Route path="/admin/donors" element={<ProtectedRoute Component={ShowDonors}/>}/>
        <Route path="/admin/recipents" element={<ProtectedRoute Component={ShowRecipents}/>}/>
        <Route path="/*" element={<Navigate to="/"/>} />
      </Routes> 
    </Router>
  );
}

export default App;
