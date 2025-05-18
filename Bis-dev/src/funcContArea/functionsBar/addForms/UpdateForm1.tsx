import React, { useState } from "react";
import "./forms.css";
import axios from "axios";
import { useEffect } from "react";

import Select, { SingleValue } from "react-select";
interface Props {
  onItemClick: () => void;
  residentId: string;
}
interface OptionType {
  value: string;
  label: string;
}
const AddForm1: React.FC<Props> = ({ onItemClick, residentId }) => {
  //const [data, setData] = useState<DataTransferItem[]>([]);
  const [citizenshipOpetion, setCitizenshipOption] = useState<OptionType[]>([]);
  const [residentData, setResidentData] = useState<any>({});

  // State for form data
  useEffect(() => {
    const fetchInhabitants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/inhabitants/getResident/${
            residentId == "0" ? "1" : residentId
          }`
        );
        console.log(response.data);
        setResidentData(response.data); // Store the fetched data
      } catch (err) {
        console.error("Error fetching resident:", err);
      }
    };

    fetchInhabitants();
  }, [residentId]);
  // gather all citizenships
  useEffect(() => {
    const fetchCitizenship = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/inhabitants/citizen"
        );
        const transformResponse: OptionType[] = response.data.map(
          (citizen: any) => ({
            value: citizen.CitizenshipID,
            label: citizen.Name,
          })
        );

        setCitizenshipOption(transformResponse);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchCitizenship();
  }, [AddForm1]);
  const setDateToUTC8 = (item: string) => {
    const utcDate = new Date(item);

    // Convert to UTC+8 (PHT)
    const utcPlus8Date = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);

    // Format as YYYY-MM-DD for <input type="date">
    const formattedDate = utcPlus8Date.toISOString().split("T")[0];
    return formattedDate;
  };
  //set formData
  useEffect(() => {
    if (Object.keys(residentData).length > 0) {
      setFormData({
        resid: residentId,
        lastName: residentData.LastName || "",
        givenName: residentData.GivenName || "",
        middleName: residentData.MiddleName || "",
        qualifier: residentData.Qualifier || "",
        dateOfBirth: setDateToUTC8(residentData.DateOfBirth) || "", // Format date HHHASSS BUUUGGGG
        address: residentData.AddressID?.toString() || "",
        placeOfBirth: residentData.PlaceOfBirth || "",
        sex: residentData.Sex?.toLowerCase() || "male", // Convert to lowercase
        civilStatus: residentData.CivilStatusID?.toString() || "1",
        occupation: residentData.OccupationID?.toString() || "1",
        citizenship: residentData.CitizenshipID?.toString() || "1",
        status: residentData.status?.toString() || "alive",
        newBarangay: residentData.newBarangay || "",
      });
    }
  }, [residentData]);

  const [formData, setFormData] = useState({
    resid: "",
    lastName: "",
    givenName: "",
    middleName: "",
    qualifier: "",
    dateOfBirth: "",
    address: "",
    placeOfBirth: "",
    sex: "male",
    civilStatus: "1",
    occupation: "1",
    citizenship: "1",
    status: "alive",
    newBarangay: "",
  });

  // Handle input changes
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleReactSelectChange = (option: SingleValue<OptionType>) => {
    const value = option?.value || "";
    setFormData({
      ...formData,
      citizenship: value,
    });
  };
  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);

    // Pass the form data to another function
    submitFormData(formData);
  };

  //function to handle submitted data
  const submitFormData = (data: typeof formData) => {
    console.log("Submitting form data to API:", data);
    if (formData.status !== "transferred") {
      formData.newBarangay == "";
    }
    const addData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/inhabitants/update",
          data
        );
        console.log("Data added successfully:", response.data);
      } catch (error) {
        console.error("Error updating:", error);
      }
    };

    console.log(data);
    addData();
    onItemClick();

    // Make your API call here
  };

  return (
    <div className="container">
      <div className="SideContainer">
        <div className="asdef">
          <div className="barangayLogoContainer">
            <img
              style={{ width: "57px", height: "57px" }}
              src="/Images/asd2.png"
            />
          </div>
          <div className="logoLabels">
            <p className="heading2">Barangay</p>
            <p className="heading2" style={{ marginTop: "-12px" }}>
              Butnga
            </p>
            <p className="heading3">Oras Eastern Samar</p>
          </div>
        </div>
      </div>
      <form className="forms" onSubmit={handleSubmit}>
        <p
          style={{
            fontFamily: '"Roboto", sans-serif',
            fontWeight: "bolder",
            fontSize: "24px",
            color: "#433BFF",
            margin: "0",
          }}
        >
          RESIDENT INFORMATION
        </p>
        <div className="formContainer">
          <label className="labels">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formContainer">
          <label className="labels">Given Name:</label>
          <input
            type="text"
            id="givenName"
            name="givenName"
            value={formData.givenName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formContainer">
          <label className="labels">Middle Name:</label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
        </div>

        <div className="formContainer">
          <label className="labels">Qualifier:</label>
          <input
            type="text"
            id="qualifier"
            name="qualifier"
            value={formData.qualifier}
            onChange={handleChange}
          />
        </div>

        <div className="formContainer">
          <label className="labels">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formContainer">
          <label className="labels">Address:</label>
          <select
            id="address"
            name="address"
            value={formData.civilStatus}
            onChange={handleChange}
            required
          >
            <option value="1">Zone 1</option>
            <option value="2">Zone 2</option>
            <option value="3">Zone 3</option>
            <option value="4">Zone 4</option>
          </select>
        </div>

        <div className="formContainer">
          <label className="labels">Place of Birth:</label>
          <input
            type="text"
            id="placeOfBirth"
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formContainer">
          <label className="labels">Sex:</label>
          <select
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="formContainer">
          <label className="labels">Civil Status:</label>
          <select
            id="civilStatus"
            name="civilStatus"
            value={formData.civilStatus}
            onChange={handleChange}
            required
          >
            <option value="1">Single</option>
            <option value="2">Married</option>
            <option value="3">Divorced</option>
            <option value="4">Separated</option>
            <option value="5">Widowed</option>
            <option value="6">Annulled</option>
            <option value="7">Unknown</option>
            <option value="8">Live-in</option>
          </select>
        </div>

        <div className="formContainer">
          <label className="labels">Occupation:</label>
          <select
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
          >
            <option value="1">Farmer</option>
            <option value="2">Teacher</option>
            <option value="3">Barangay Official</option>
            <option value="4">Government Worker</option>
            <option value="5">Carpenter</option>
            <option value="6">Fishermen</option>
            <option value="7">Student</option>
            <option value="8">Helper</option>
          </select>
        </div>

        <div className="formContainer">
          <label className="labels">Citizenship:</label>
          <Select
            options={citizenshipOpetion}
            name="ResidentID"
            id="ResidentID"
            value={citizenshipOpetion.find(
              (option) => option.value === formData.citizenship
            )}
            onChange={handleReactSelectChange}
            className="reactSelect"
            required
            //isMulti={false} // Set to true for multi-select
          />
        </div>
        <div className="formContainer">
          <label className="labels">Life Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="alive">Alive</option>
            <option value="deceased">Deceased</option>
            <option value="transferred">Transffered</option>
          </select>
        </div>
        {formData.status == "transferred" ? (
          <div className="formContainer">
            <label className="labels">NewBarangay: </label>
            <input
              type="text"
              id="newBarangay"
              name="newBarangay"
              value={formData.newBarangay}
              onChange={handleChange}
              required
            />
          </div>
        ) : (
          ""
        )}
        <div className="formContainer" style={{ marginTop: "10px" }}>
          <button className="buttons" type="submit">
            Save
          </button>
          <button className="buttons" type="button" onClick={onItemClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm1;
