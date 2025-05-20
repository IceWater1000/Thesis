import React, { useState } from "react";
import "./forms.css";
import axios from "axios";
import { useEffect } from "react";

import Select, { SingleValue } from "react-select";
import AddToLog from "../../../Logging";
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

  const [residentData, setResidentData] = useState<any>({});
  const [options, setOptions] = useState<OptionType[]>([]);
  const [formData, setFormData] = useState({
    HouseholdNumber: "",
    AddressID: "1",
    TotalInhabitants: "",
    HouseholdHead: "",
  });
  const filterOption = (options: OptionType, inputValue: string) => {
    const lastName = options.label.split(",")[0]; // Extract the surname
    return lastName.toLowerCase().includes(inputValue.toLowerCase());
  };
  // State for form data
  //Getting the House that is being Updated
  useEffect(() => {
    //Options of the React Select
    const fetchResidents = async (id: string) => {
      console.log(residentId);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/inhabitants/residentsNotHouseholdHeadUpdate/${id}`
        );
        const transformResponse: OptionType[] = response.data.map(
          (residents: any) => ({
            value: residents.ResidentID,
            label: residents.Name,
          })
        );

        setOptions(transformResponse);
      } catch (err) {
        console.log("Error", err);
      }
    };
    const fetchInhabitants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/household/getHouse/${
            residentId == "0" ? 0 : residentId
          }`
        );
        setResidentData(response.data); // Store the fetched data
        fetchResidents(response.data.HouseholdHead);
      } catch (err) {
        console.error("Error fetching resident:", err);
      }
    };

    fetchInhabitants();
  }, [residentId]);
  //set formData

  useEffect(() => {
    if (Object.keys(residentData).length > 0) {
      setFormData({
        HouseholdNumber: residentData.HouseholdNumber || "",
        AddressID: residentData.AddressID || "",
        TotalInhabitants: residentData.TotalInhabitants || "",
        HouseholdHead: residentData.HouseholdHead || "",
      });
    }
  }, [residentData]);

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
      HouseholdHead: value,
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
    const addData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/household/update",
          data
        );
        console.log("Data added successfully:", response.data);
        AddToLog("Data Updated --Household--");
      } catch (error) {
        console.error("Error adding data:", error);
      }
    };
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
          <label className="labels">Total Inhabitants</label>
          <input
            type="text"
            id="TotalInhabitants"
            name="TotalInhabitants"
            value={formData.TotalInhabitants}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formContainer">
          <label className="labels">House Head:</label>

          <Select
            options={options}
            name="ResidentID"
            id="ResidentID"
            filterOption={filterOption}
            value={options.find(
              (option) => option.value == formData.HouseholdHead
            )}
            onChange={handleReactSelectChange}
            className="reactSelect"
            required
            //isMulti={false} // Set to true for multi-select
          />
        </div>

        <div className="formContainer">
          <label className="labels">Address:</label>
          <select
            id="AddressID"
            name="AddressID"
            value={formData.AddressID}
            onChange={handleChange}
            required
          >
            <option value="1" selected>
              Zone 1
            </option>
            <option value="2">Zone 2</option>
            <option value="3">Zone 3</option>
            <option value="4">Zone 4</option>
          </select>
        </div>

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
