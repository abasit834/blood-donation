import { useEffect, useState } from "react";
import "./Recipent.css";
import { Alert } from "@mui/material";
import bloodDonation from "../Assets/blood-donation.png";

function FindDonor() {
  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("Select Your Blood Group");
  const [city, setCity] = useState("Select Your City");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState("");
  const [ageCheck, setAgeCheck] = useState(false);

  useEffect(() => {
    document.title = "Find a Donor";
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
   
  }

  function containsNumber(str) {
    const regex = /\d/;
    return regex.test(str);
  }

  return (
    <div id="divv">
      <div className="recipient-container">
        <Alert severity="info" style={{ marginTop: "190px" }}>
          Fill out the form to find a suitable donor.
        </Alert>
        <div className="form-structure">
          <div className="form-header">
            <h1>Find Donor Form</h1>
            <div className="header-content">
              <img src={bloodDonation} alt="Blood Donation" className="blood-donation-img" />
              <p>
                Please provide the necessary details to help us find a suitable
                blood donor for the patient.
              </p>
            </div>
          </div>
          <div className="form-content">
            <div className="form-wrapper">
              <form onSubmit={handleSubmit}>
                <div className="form-item">
                  <label htmlFor="patientName">Patient Name</label>
                  <input
                    type="text"
                    name="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                  {containsNumber(patientName) ? (
                    <span>*Patient Name should not contain numeric digits</span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-item">
                  <label htmlFor="blood-group">Blood Group</label>
                  <select
                    name="blood-group"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  >
                    <option value="Select Your Blood Group">Select Your Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="form-item">
                  <label htmlFor="city">Choose City</label>
                  <select
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="Select Your City">Select Your City</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                  </select>
                </div>

                <div className="form-item">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="+92"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {phoneNumber.length !== 11 && phoneNumber.length > 0 ? (
                    <span>*Phone Number should be 11 digits</span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-item">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      setAgeCheck(e.target.value === "" || e.target.value < 18);
                    }}
                  />
                  {ageCheck ? <span>*Age should be greater than 18 years</span> : ""}
                </div>

                <div className="form-item">
                  <button type="submit">Find Donor</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindDonor;
