import React, { useEffect, useState } from "react";
import "./Donor.css";
import bloodDonation from "../Assets/blood-donation.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function BecomeADonor() {
  const [contact, setContact] = useState(
    !sessionStorage.getItem("contact") ? "" : sessionStorage.getItem("contact")
  );
  const [radioButton, setRadioChecked] = useState(false);
  const [hasDonated, setHasDonated] = useState(true);
  const [ageCheck, setAgeCheck] = useState(false);
  const [name, setName] = useState(
    !sessionStorage.getItem("name") ? "" : sessionStorage.getItem("name")
  );
  const [age, setAge] = useState(
    !sessionStorage.getItem("age") ? "" : sessionStorage.getItem("age")
  );
  const [gender, setGender] = useState(
    !sessionStorage.getItem("gender") ? "" : sessionStorage.getItem("gender")
  );
  const [address, setAddress] = useState(
    !sessionStorage.getItem("address") ? "" : sessionStorage.getItem("address")
  );
  const [weight, setWeight] = useState(
    !sessionStorage.getItem("weight") ? "" : sessionStorage.getItem("weight")
  );
  const [bloodgroup, setBloodGroup] = useState(
    !sessionStorage.getItem("blood-group")
      ? ""
      : sessionStorage.getItem("blood-group")
  );
  const [lastdonated, setLastDonated] = useState(
    !sessionStorage.getItem("last-donated")
      ? ""
      : sessionStorage.getItem("last-donated")
  );
  const [cities, setCitiesFromApi] = useState([]);

  function calculateAge(dob) {
    // Convert the date of birth into a Date object
    const birthDate = new Date(dob);

    // Get the current date
    const today = new Date();

    // Calculate the difference in years
    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust if the birth date hasn't occurred yet this year
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }

  const fetchCities = async () => {
    const where = encodeURIComponent(
      JSON.stringify({
        name: {
          $exists: true,
        },
      })
    );
    try {
      const response = await fetch(
        `https://parseapi.back4app.com/classes/Pakistancities_City?limit=6445&order=name&keys=name&where=${where}`,
        {
          headers: {
            "X-Parse-Application-Id":
              "MhoVSUP89e1ujc0Z6EGYruWbQFJX5wqzEzNFdt4O", // This is your app's application id
            "X-Parse-REST-API-Key": "9Rv7VI4pVppMkhF9cmPOFWmFCFd0ag7b5TqW7s2j", // This is your app's REST API key
          },
        }
      );
      const data = await response.json(); // Here you have the data that you need
      //console.log(JSON.stringify(data, null, 2));
      setCitiesFromApi(data.results.map((city) => city.name));
    } catch (err) {
      console.log("Error fetching cities", err);
    }
  };

  useEffect(() => {
    document.title = "Become A Donor";
    fetchCities();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      name === "" ||
      age === "" ||
      address === "" ||
      weight === "" ||
      bloodgroup === "Select Your Blood Group" ||
      gender === "Select Your Gender" ||
      gender === "" ||
      bloodgroup === "" ||
      contact === ""
    ) {
      toast.error("Please fill in all the fields", {
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
    if (containsNumber(name)) {
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
    if (ageCheck) {
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
    if (contact.length !== 11 || contact.length < 11) {
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

    console.log(gender, bloodgroup);
    if (!radioButton) {
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
    if (hasDonated === false && lastdonated === "") {
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
    if (weight < 50) {
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

    try {
      const submitData = {
        name: name,
        dob: age,
        gender: gender,
        bloodgroup: bloodgroup,
        weight: weight,
        city: address,
        contact: contact,
        lastdonated: lastdonated,
      };

      const response = await axios.post(
        "http://localhost:3005/donors/addDonor",
        submitData
      );
      console.log(response.data);
      if (response.data.dup === true) {
        toast.error(response.data.message, {
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
    } catch (err) {
      console.log("Error Occurred", err);
    }
  }

  function containsSpecialCharacter(str) {
    // Regular expression to match special characters and symbols
    const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>+-]/;

    // Test the string against the regular expression
    return specialCharacterPattern.test(str);
  }

  function containsNumber(str) {
    const regex = /\d/;
    return regex.test(str);
  }

  function containsNegative(str) {
    const num = parseInt(str);
    if (num < 0) return true;

    return false;
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
                  placeholder="Enter Your Full Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    sessionStorage.setItem("name", e.target.value);
                  }}
                />

                {containsSpecialCharacter(name) ? (
                  <span>*Name should not contain any special character</span>
                ) : (
                  ""
                )}
                <br />
                {containsNumber(name) ? (
                  <span>*Name should not contain numeric digits</span>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={age}
                  // defaultValue={age}
                  onChange={(e) => {
                    const age = calculateAge(e.target.value);
                    console.log(age);
                    setAge(e.target.value);
                    sessionStorage.setItem("age", e.target.value);
                    if (age === "") setAgeCheck(false);
                    else if (age <= 16 || age >= 70) setAgeCheck(true);
                    else setAgeCheck(false);
                  }}
                />
                {ageCheck ? (
                  <span>
                    *Not Eligible to Donate (Age should be between 16-70)
                  </span>
                ) : (
                  ""
                )}
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
                <label htmlFor="bloodgroup">Blood Group</label>
                <select
                  name="bloodgroup"
                  onChange={(e) => {
                    setBloodGroup(e.target.value);
                    sessionStorage.setItem("blood-group", e.target.value);
                  }}
                  // defaultValue={bloodgroup}
                  value={bloodgroup}
                >
                  <option value="Select Your Blood Group">
                    Select Your Blood Group
                  </option>
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
                {weight < 50 && weight.length > 0 ? (
                  <span>
                    *Not Eligible to Donate (Min. Eligible Weight is 50)
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <select
                  name="city"
                  value={address}
                  // defaultValue={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    sessionStorage.setItem("address", e.target.value);
                  }}
                >
                  <option value="Select Your City">Select Your City</option>
                  {cities.map((city, index) => {
                    return (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contact">Contact Number</label>
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
                {containsNegative(contact) ? (
                  <span>*Contact Number can't be negative</span>
                ) : (
                  ""
                )}
                <br />
                {contact.length > 11 ? (
                  <span>*Contact Number should be 11 digits</span>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group" id="radio">
                <label>Have you donated in the last 3 months?</label>
                <div>
                  <input
                    type="radio"
                    name="donated-recently"
                    value="yes"
                    onClick={() => {
                      setHasDonated(false);
                      setRadioChecked(true);
                    }}
                  />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="donated-recently"
                    value="no"
                    onClick={() => {
                      setHasDonated(true);
                      setRadioChecked(true);
                    }}
                  />
                  <label htmlFor="no">No</label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastdonated">Last Donation Date</label>
                <input
                  type="date"
                  name="lastdonated"
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
                <button type="submit">Submit</button>
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
