import React from "react";
import SideBar from "./SideBar";
import Box from '@mui/material/Box';
import "./Dashboard.css";
import useSWR from "swr";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


// Define the styles separately
const boxStyles = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
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
  const navigate = useNavigate();

  const getCount = async (url) =>{
    
    try{
      const token = localStorage.getItem("token");
      const response = await axios.get(url,{headers :{'Authorization' : token} });
      // console.log(response.data);
      if(response.status === 403)
      {
        alert("Login Session Expired, Please Login Again");
        localStorage.removeItem("token");
        navigate("/admin/login");
        return;
      }
      return response;
  
    }
    catch(err){
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

        return err.response;
    }
  
  }


  const getAll = async(url)=>{
    const token = localStorage.getItem("token");
    try{
        const response = await axios.get(url,{headers : {
        'Authorization' : token
        }});

        if(response.status === 403)
          {
            alert("Login Session Expired, Please Login Again");
            localStorage.removeItem("token");
            navigate("/admin/login");
            return;
          }
          return response;
    }
    catch(err)
    {
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return err.response;
    }

  }


  const {data : bloodData , error : bloodError} = useSWR("http://localhost:3005/admin/count-by-bloodgroup",getCount);
  const { data: totalData, error: totalError } = useSWR(
    "http://localhost:3005/admin/get-total-count",
    getAll
  );



  // Blood types
  const bloodTypes = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
  // Dummy data for donors (in a real application, this would come from your data source)
  const donorsAvailable = [0,0,0,0,0,0,0,0]// Random numbers for demo


  // if(!bloodData && !totalData){
  //   return <>
  //   Data Loading...
  //   </>
  // }
  return (  
    <div className="body">
      <SideBar />
      <Box sx={boxStyles}>
        <Box sx={cardStyles}>
          <h2 className="heading">Total Donors</h2>
          <p>{totalData ? totalData.data.donors : 0}</p>
        </Box>
        <Box sx={cardStyles}>
          <h2 className="heading">Total Recipients</h2>
          <p>{totalData ? totalData.data.recipients : 0}</p>
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
              {bloodData
                ? bloodData.data.map((donors, index) => (
                    <td key={index}>{donors}</td>
                  ))
                : donorsAvailable.map((donors, index) => (
                    <td key={index}>{donors}</td>
                  ))
              }
            </tr>
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Dashboard;
