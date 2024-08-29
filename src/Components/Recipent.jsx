import { useEffect, useState } from "react";
import "./Recipent.css";
import bloodDonation from "../Assets/blood-donation.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FindDonor() {
  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("Select Your Blood Group");
  const [city, setCity] = useState("Select Your City");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cities, setCitiesFromApi] = useState([]);
  const [age, setAge] = useState("");

  const fetchCities = async () => {
    const where = encodeURIComponent(
      JSON.stringify({
        name: { $exists: true }
      })
    );
    try {
      const response = await fetch(
        `https://parseapi.back4app.com/classes/Pakistancities_City?limit=6445&order=name&keys=name&where=${where}`,
        {
          headers: {
            "X-Parse-Application-Id": "MhoVSUP89e1ujc0Z6EGYruWbQFJX5wqzEzNFdt4O",
            "X-Parse-REST-API-Key": "9Rv7VI4pVppMkhF9cmPOFWmFCFd0ag7b5TqW7s2j"
          }
        }
      );
      const data = await response.json();
      setCitiesFromApi(data.results.map((city) => city.name));
    } catch (err) {
      console.log("Error fetching cities:", err);
    }
  };

  useEffect(() => {
    document.title = "Find a Donor";
    fetchCities();
  }, []);

  function containsSpecialCharacter(str) {
    const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacterPattern.test(str);
  }

  function containsNegative(str) {
    const num = parseInt(str, 10);
    return num < 0;
  }

  function containsNumber(str) {
    const regex = /\d/;
    return regex.test(str);
  }




  async function handleSubmit(e) {
    e.preventDefault();


    if (
      !patientName ||
      bloodGroup === "Select Your Blood Group" ||
      city === "Select Your City" ||
      !phoneNumber ||
      !age
    ) {
      toast.error("Please fill in all the fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      return;
    }

    if (containsNumber(patientName) || containsSpecialCharacter(patientName)) {
      toast.warn("Please Enter Name Correctly", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      return;
    }

    if (containsNegative(phoneNumber) || phoneNumber.length !== 11) {
      toast.warn("Invalid Phone Number", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      return;
    }

    if (age > 200 || age === "0") {
      toast.warn("Please Recheck Patient's Age", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3005/recipients/addRecipient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          patientName,
          bloodgroup: bloodGroup,
          city,
          phoneNumber,
          age,
          lastDonated: new Date().toISOString().split("T")[0] // Current date
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Form submitted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });

        setPatientName("");
        setBloodGroup("Select Your Blood Group");
        setCity("Select Your City");
        setPhoneNumber("");
        setAge("");

      } else {
        console.error("Server response error:", data);
        toast.error(data.message || "Failed to add recipient", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  }

  return (
    <div id="divv">
      <div className="form-structure">
        <div className="form-header">
          <div className="header-content">
            <div>
              <img src={bloodDonation} alt="Blood Donation" className="blood-donation-img" />
            </div>
            <div>
              <h1>Recipient Form</h1>
              <p>
                Please provide the necessary details to help us find a suitable
                blood donor for the patient.
              </p>
            </div>
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
                  placeholder="Enter Patient's Name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
                {containsSpecialCharacter(patientName) && (
                  <span>*Name should not contain any special character</span>
                )}
                {containsNumber(patientName) && (
                  <span>*Patient Name should not contain numeric digits</span>
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
                <label htmlFor="city">City</label>
                <select
                  name="city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    sessionStorage.setItem("city", e.target.value);
                  }}
                >
                  <option value="Select Your City">Select Your City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-item">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="+92"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {containsNegative(phoneNumber) && (
                  <span>Contact Number can't be negative</span>
                )}
                {phoneNumber.length !== 11 && (
                  <span>Contact Number should be 11 digits long</span>
                )}
              </div>

              <div className="form-item">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                {age > 200 && <span>Age can't be greater than 200</span>}
                {age === "0" && <span>Age can't be zero</span>}
              </div>

              <div className="form-item">
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

export default FindDonor;
