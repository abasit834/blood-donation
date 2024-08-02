import React from "react";
import SideBar from "./SideBar";
import Box from '@mui/material/Box';
import "./Dashboard.css";
import { useState } from "react";


// Define the styles separately
const boxStyles = {
  mt: 5,
  ml: 20,
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  gap: 2,
  flexWrap: "wrap",
};

const cardStyles = {
  width: 250,
  height: 150,
  border: "2px solid #D3D3D3",
  borderRadius: 10,
  boxShadow: 6,
  display: "inline-block",
  backgroundColor:   "#ffe6e6"
};

function Dashboard() {

   const [totalDonors,setTotalDonors] = useState(0);
   const [totalRecipients,setTotalRecipients] = useState(0);


  // Blood types
  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  // Dummy data for donors (in a real application, this would come from your data source)
  const donorsAvailable = [0,0,0,0,0,0,0,0]// Random numbers for demo

  return (
    <div className="body">
      <SideBar />
      <Box sx={boxStyles}>
        <Box sx={cardStyles}>
          <h2 className="heading">Total Donors</h2>
          <p>{totalDonors}</p>
        </Box>
        <Box sx={cardStyles}>
          <h2 className="heading">Total Recipients</h2>
          <p>{totalRecipients}</p>
        </Box>
      </Box>
      <div className="table-container">
        <table className="table-light-red custom-table" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Blood Type</th>
              {bloodTypes.map((type, index) => (
                <th key={index}>{type}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Donors Available</th>
              {donorsAvailable.map((donors, index) => (
                <td key={index}>{donors}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
