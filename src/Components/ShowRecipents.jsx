import React from "react";
import SideBar from "./SideBar"
import "./ShowDonors.css";


function ShowRecipents (){
    return <div className="recipent-body">
        <SideBar/>
        <h1 style={{textAlign : "center"}}>Recipents will display here</h1>
        <div className="data-table-container recipent">
                <table className="data-table data-table-light-red" style={{ marginTop: "20px" }}>
                    <thead>
                        <tr className="data-table-header-row">
                            <th>ID</th>
                            <th>Patient Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th className="data-table-blood-group">Blood Group</th>
                            <th className="data-table-contact">Contact No.</th>
                            <th>Donor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* Example data */}
                            <td>1</td>
                            <td>John Doe</td>
                            <td>30</td>
                            <td>Male</td>
                            <td>O+</td>
                            <td>123-456-7890</td>
                            <td>Ahmed</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
    </div>
}

export default ShowRecipents;