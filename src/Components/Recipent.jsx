import { useEffect, useState } from "react";
import "./Recipent.css";
import bloodDonation from "../Assets/blood-donation.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function FindDonor() {
  const [bloodGroup, setBloodGroup] = useState("Select Your Blood Group");
  const [city, setCity] = useState("Select Your City");
  const [cities,setCitiesFromApi] =  useState([]);
  const navigate =  useNavigate();


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
    document.title = "Find a Donor";
    fetchCities();
  }, []);

  async function handleSubmit (e) {
    e.preventDefault();

    if(bloodGroup === "Select Your Blood Group" || city === "Select Your City")
    {
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

    // sending form to database api call
    const date = new Date();
    const isoDate = date.toISOString().split('T')[0]; // Returns only the date part in YYYY-MM-DD format

    console.log(isoDate); // Outputs the date in ISO 8601 format (e.g., 2024-08-20)
    
    navigate('/donors',{ state : {bloodGroup : bloodGroup , city : city} })
  
  }

  function containsNumber(str) {
    const regex = /\d/;
    return regex.test(str);
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
                  // defaultValue={address}
                  onChange={(e) => {
                    setCity(e.target.value);
                    sessionStorage.setItem("city", e.target.value);
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


                <div className="form-item">
                <button type="submit">
                    Find Donor
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

export default FindDonor;
