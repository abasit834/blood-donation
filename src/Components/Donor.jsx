import React, { useEffect, useState } from "react";
import "./Donor.css";
import bloodDonation from "../Assets/blood-donation.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function BecomeADonor() {
  const [contact,setContact] = useState(!sessionStorage.getItem("contact")?"":sessionStorage.getItem("contact"));
  const [radioButton,setRadioChecked] = useState(false);
  const [hasDonated, setHasDonated] = useState(true);
  const [ageCheck,setAgeCheck] = useState(false);
  const [name, setName] = useState(!sessionStorage.getItem("name")?"":sessionStorage.getItem("name"));
  const [age, setAge] = useState(!sessionStorage.getItem("age")?"":sessionStorage.getItem("age"));
  const [gender, setGender] = useState(!sessionStorage.getItem("gender")?"":sessionStorage.getItem("gender"));
  const [address, setAddress] = useState(!sessionStorage.getItem("address")?"":sessionStorage.getItem("address"));
  const [weight, setWeight] = useState(!sessionStorage.getItem("weight")?"":sessionStorage.getItem("weight"));
  const [bloodgroup, setBloodGroup] = useState(!sessionStorage.getItem("blood-group")?"":sessionStorage.getItem("blood-group"));
  const [lastdonated, setLastDonated] = useState(!sessionStorage.getItem("last-donated")?"":sessionStorage.getItem("last-donated"));

  useEffect(() => {
    document.title = "Become A Donor";
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      name === "" ||
      age === "" ||
      address === "" ||
      weight === "" ||
      bloodgroup === "Select Your Blood Group" ||
      gender === "Select Your Gender" ||
      gender ==="" ||
      bloodgroup === "" || contact === ""
    ) {
      toast.error('Please fill in all the fields', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
    if(containsNumber(name)){
      toast.error("Name cannot be numeric", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

        });
      return;
    }
    if(ageCheck)
    {
      toast.warn("Not Eligible to Donate", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

        });
      return;
    }  
    if (contact.length !== 11) {
      toast.warn("Contact Number should be exactly 11 digits", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    
    console.log(gender,bloodgroup);
    if(!radioButton)
    {
      toast.warn("Select any radio option", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

        });
      return;
    }
  
    console.log(gender);
    if(hasDonated===false && lastdonated==="")
    {
      toast.warn("Please enter last donated date", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

        });
      return;
    }
    if(weight < 50)
    {
      toast.warn("Weight Should be between 17-70", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
  
        });
        return;
    }

      toast.success("Form Submitted Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

      });
    setName("");
    setAddress("");
    setAge("");
    setGender("");
    setBloodGroup("");
    setLastDonated("");
    setWeight("");
    setContact("");
    sessionStorage.clear();
  }

  function containsNumber(str) {
    const regex = /\d/;
    return regex.test(str);
  }


  return (
    <div className="donor">
      <div className="form-struct">
        <div className="form-head">
          <div>
            <img src={bloodDonation} alt="" />
          </div>

          <div>
            <h1>Blood Donation Form</h1>
            <p>
              Confidential - Please answer the following questions correctly.
              This will help to protect you and the patient <br />
              who receives your blood.{" "}
            </p>
          </div>
        </div>
        <div className="form-body">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    sessionStorage.setItem("name", e.target.value);
                  }}
              
                />
                {
                  containsNumber(name)?<span>*Name should not contain numeric digits</span>:""
                }
                
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  value={age}
                  // defaultValue={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    sessionStorage.setItem("age", e.target.value);
                    if(e.target.value === "")
                    setAgeCheck(false);
                    else if(e.target.value <= 16 || e.target.value >=70)
                    setAgeCheck(true);  
                    else
                    setAgeCheck(false);
                  }}
                />
                {ageCheck ? <span>*Not Eligible to Donate (Age should be between 16-70)</span> : ""}
              </div>


              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  value={gender}
                  // defaultValue={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    sessionStorage.setItem("gender", e.target.value);
                  }}
                >
                  <option value="Select Your Gender">Select Your Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  </select>
              </div>


              <div className="form-group">
                <label htmlFor="address">Contact Number</label>
                <input
                  type="number"
                  name="contact"
                  placeholder="+92"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    sessionStorage.setItem("contact", e.target.value);
                  }}
                />
                {contact.length > 11 ? <span>Contact Number should be 11 digits</span> :""}
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  // defaultValue={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    sessionStorage.setItem("address", e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <input
                  type="number"
                  name="weight"
                  placeholder="Kg"
                  value={weight}
                  // defaultValue={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    sessionStorage.setItem("weight", e.target.value);
                  }}
                />
                {weight < 50 && weight.length > 0 ? <span>*Not Eligible to Donate (Min. Eligible Weight is 50)</span> :""}
              </div>

              <div className="form-group">
                <label htmlFor="blood-group">Blood Group</label>
                <select
                  name="blood-group"
                  onChange={(e) => {
                    setBloodGroup(e.target.value);
                    sessionStorage.setItem("blood-group", e.target.value);
                  }}
                  // defaultValue={bloodgroup}
                  value={bloodgroup}
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

              <div className="form-group" id="radio">
                <label>Have you donated in the last 3 months?</label>
                <div>
                  <input
                    type="radio"
                    name="donated-recently"
                    value="yes"
                    onClick={() => {setHasDonated(true);setRadioChecked(true)}}
                  />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="donated-recently"
                    value="no"
                    onClick={() => {setHasDonated(false); setRadioChecked(true)}}
                  />
                  <label htmlFor="no">No</label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="last-donation-date">Last Donation Date</label>
                <input
                  type="date"
                  name="last-donation-date"
                  disabled={hasDonated}
                  value={lastdonated}
                  // defaultValue={lastdonated}
                  onChange={(e) => {
                    setLastDonated(e.target.value);
                    sessionStorage.setItem("last-donated", e.target.value);
                  }}
                />
              </div>

              {/* session Storage */}
              <div className="form-group">
                <button type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default BecomeADonor;
