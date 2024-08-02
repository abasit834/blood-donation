import React from "react";
import SideBar from "./SideBar";
import "./ShowDonors.css";

function ShowDonors() {
    return (
        <div>
            <SideBar />
            <h1 style={{ paddingLeft: "200px", textAlign: "center" }}>
                Donors will display here
            </h1>
            <div className="data-table-container">
                <table className="data-table data-table-light-red" style={{ marginTop: "20px" }}>
                    <thead>
                        <tr className="data-table-header-row">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th className="data-table-blood-group">Blood Group</th>
                            <th className="data-table-contact">Contact No.</th>
                            <th className="data-table-address">Address</th>
                            <th>Weight</th>
                            <th>Last Donated</th>
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
                            <td>123 Elm St</td>
                            <td>70kg</td>
                            <td>01/01/2024</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShowDonors;
