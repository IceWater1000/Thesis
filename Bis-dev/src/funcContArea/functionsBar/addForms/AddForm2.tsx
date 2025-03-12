import React, { useEffect, useState } from "react";
import "./forms.css";
import axios from "axios";
import Select, { SingleValue } from "react-select";

interface Props {
  onItemClick: () => void;
}

interface OptionType {
  value: string;
  label: string;
}
const AddForm2: React.FC<Props> = ({ onItemClick }: Props) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [submited, setSubmitted] = useState(false);
  // State for form data
  const [formData, setFormData] = useState<{
    HouseholdNumber: string;
    AddressID: string;
    TotalInhabitants: string;
    HouseholdHead: string | null; // Explicitly allow string or null
  }>({
    HouseholdNumber: "",
    AddressID: "1",
    TotalInhabitants: "",
    HouseholdHead: null,
  });
  const selectedOption =
    options.find((option) => option.value === formData.HouseholdHead) || null;

  // Get Data from for the Household Head
  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/inhabitants/residentsNotHouseholdHead "
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
    fetchResidents();
  }, [AddForm2, submited]);

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
  const handleReactSelectChange = (
    selectedOption: { value: string } | null
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      HouseholdHead: selectedOption ? selectedOption.value : null, // Ensure type remains string | null
    }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Pass the form data to another function
    submitFormData(formData);
    cleanFormData();
  };

  //function to handle submitted data
  const submitFormData = (data: typeof formData) => {
    console.log("Submitting form data to API:", data);
    const addData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/household/add",
          data
        );
        console.log("Data added successfully:", response.data);
      } catch (error) {
        console.error("Error adding data:", error);
      }
    };
    addData();
    onItemClick();
    // Make your API call here
  };
  const cleanFormData = () => {
    setSubmitted((prev) => !prev);
    setFormData({
      HouseholdNumber: "",
      AddressID: "1",
      TotalInhabitants: "",
      HouseholdHead: null,
    });
  };
  return (
    <div className="container householdRecord">
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
          HOUSEHOLD RECORD
        </p>
        <div className="formContainer">
          <label className="labels">House Number</label>
          <input
            type="number"
            id="HouseholdNumber"
            name="HouseholdNumber"
            value={formData.HouseholdNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formContainer">
          <label className="labels">Total Inhabitants</label>
          <input
            type="number"
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
            value={selectedOption}
            onChange={handleReactSelectChange}
            className="reactSelect"

            //isMulti={false} // Set to true for multi-select
          />
        </div>

        <div className="formContainer">
          <label className="labels">Zone:</label>
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
            Submit
          </button>
          <button
            className="buttons"
            type="button"
            onClick={() => {
              onItemClick();
              cleanFormData();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddForm2;
