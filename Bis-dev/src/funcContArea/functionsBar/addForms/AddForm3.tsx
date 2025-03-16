import React from "react";
import { useState } from "react";
import axios from "axios";
import Select, { SingleValue } from "react-select";
import { useEffect } from "react";
import HouseMembersAddingConfirmation from "./ConfirmationModals/HouseMembersAddingConfirmation";
interface Props {
  onItemClick: () => void;
}
interface OptionType {
  value: string;
  label: string;
}

const AddForm3: React.FC<Props> = ({ onItemClick }: Props) => {
  //Options for the Select Button
  const [options, setOptions] = useState<OptionType[]>([]);
  const [houseOption, setHouseOption] = useState<OptionType[]>([]);
  // State for form data
  const [isConfirming, setIsConfirming] = useState(false);
  const [formData, setFormData] = useState({
    Id: "123",
    HouseholdNumber: "123",
    RelationID: "1",
  });
  useEffect(() => {
    //Fetch All Residents Data to put on the Select Options
    const fetchResidents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/inhabitants/residentsNotHouseholdHeadAndMember"
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
    //Fetch All Houses Data to put on the Select Options
    const fetchHouses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/household/householdtracking"
        );
        const transformResponse: OptionType[] = response.data.map(
          (houses: any) => ({
            value: houses.HouseholdNumber,
            label: houses.Name,
          })
        );
        setHouseOption(transformResponse);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchHouses();
    fetchResidents();
  }, [AddForm3, formData]);

  // for Select Option and Filter Option
  const selectedOption =
    options.find((option) => option.value === formData.Id) || null;
  const selectedOption2 =
    houseOption.find((option) => option.value === formData.HouseholdNumber) ||
    null;
  const filterOption = (options: OptionType, inputValue: string) => {
    const lastName = options.label.split(",")[0]; // Extract the surname
    return lastName.toLowerCase().includes(inputValue.toLowerCase());
  };

  const cleanFormData = () => {
    setFormData({
      Id: "",
      HouseholdNumber: "",
      RelationID: "1",
    });
  };
  // Handle input changes
  const handleReactSelectChange = (option: SingleValue<OptionType>) => {
    const value = option?.value || "";
    console.log(value);
    setFormData({
      ...formData,
      Id: value,
    });
  };
  const handleReactSelectChange2 = (option: SingleValue<OptionType>) => {
    console.log(options);
    const value = option?.value || "";
    setFormData({
      ...formData,
      HouseholdNumber: value,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };
  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
    console.log(formData.HouseholdNumber);
    // Pass the form data to another function
    setIsConfirming((prev) => !prev);
  };

  //function to handle submitted data
  const submitFormData = (data: typeof formData) => {
    console.log("Submitting form data to API:", data);
    const addHH = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/inhabitants/addHH",
          formData
        );
        console.log("Data added successfully:", response.data);
      } catch (err) {
        console.error("Error adding data:", err);
      }
    };
    addHH();

    onItemClick();
    alert("Data Added Successfully");
    // Make your API call here
  };

  //Confirmation Modal Click Fucntions

  const OnCancelClickHanler = () => {
    setIsConfirming((prev) => !prev);
  };

  const OnConfirmClickHandler = () => {
    submitFormData(formData);
    setIsConfirming((prev) => !prev);
    cleanFormData();
    onItemClick();
  };
  return (
    <>
      <HouseMembersAddingConfirmation
        CurrentState={isConfirming}
        OnCancelClick={OnCancelClickHanler}
        OnConfirmClick={OnConfirmClickHandler}
        HouseNumber={formData.HouseholdNumber}
        RelationShip={Number(formData.RelationID)}
      />
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
            Household Member
          </p>
          <div className="formContainer">
            <label className="labels">Resident</label>
            <Select
              options={options}
              name="ResidentID"
              id="ResidentID"
              value={selectedOption}
              filterOption={filterOption}
              onChange={handleReactSelectChange}
              className="reactSelect"
              required
              //isMulti={false} // Set to true for multi-select
            />
          </div>
          <div className="formContainer">
            <label className="labels">House Number</label>
            <Select
              options={houseOption}
              name="HouseholdNumber"
              id="HouseholdNumber"
              value={selectedOption2}
              filterOption={filterOption}
              onChange={handleReactSelectChange2}
              className="reactSelect"
              required
              //isMulti={false} // Set to true for multi-select
            />
          </div>
          <div className="formContainer">
            <label className="labels">Relation to Household Head</label>
            <select
              className="select"
              id="RelationID"
              name="RelationID"
              value={formData.RelationID}
              onChange={handleChange}
              required
              defaultValue={1}
            >
              <option value="1">Father</option>
              <option value="2">Mother</option>
              <option value="3">Son</option>
              <option value="4">Daughter</option>
              <option value="5">Aunt</option>
              <option value="6">Uncle</option>
              <option value="7">Grandparent</option>
              <option value="8">Grandson/Granddaughter</option>
              <option value="9">Cousin</option>
              <option value="10">Neice/Nephew</option>
              <option value="11">Friend</option>
              <option value="12">Spouse</option>
              <option value="13">Brother</option>
              <option value="14">Sister</option>
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
                cleanFormData();
                onItemClick();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddForm3;
