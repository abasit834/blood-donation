
import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import HomePage from './Components/Home';
import BecomeADonor from './Components/Donor';
import Dashboard from './Components/Dashboard';
import AdminLogin from './Components/AdminLogin';
import ShowDonors from "./Components/ShowDonors";
import ShowRecipents from "./Components/ShowRecipents"
import FindDonor from './Components/Recipent';
import RefreshHandler from './Components/RefreshHandler';
import CardDisplay from './Components/bloodCardDisplay';



function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  const ProtectedRoute = (props) => {
    const {Component} = props;
    return isLoggedIn ? <Component/> : <Navigate to="/admin/login"/>;
  }    
  


  return (
     <Router>
      <RefreshHandler setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/become-a-donor" element={<BecomeADonor />} />
        <Route path="/recipent" element={<FindDonor />} />
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/dashboard" element={<ProtectedRoute  Component={Dashboard}/>}/>
        <Route path="/admin/donors" element={<ProtectedRoute Component={ShowDonors}/>}/>
        <Route path="/admin/recipents" element={<ProtectedRoute Component={ShowRecipents}/>}/>
        <Route path="/CardDisplay" element={<CardDisplay/>} />
        <Route path="/*" element={<Navigate to="/"/>} />
      </Routes> 
    </Router>
  
  
  );
}

export default App;