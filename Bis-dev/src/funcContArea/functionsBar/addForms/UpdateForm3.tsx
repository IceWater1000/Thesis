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
const UpdateForm3: React.FC<Props> = ({ onItemClick, residentId }) => {
  const [memberData, setMemberData] = useState<any>({});
  const [options, setOptions] = useState<OptionType[]>([]);
  const [houseOption, setHouseOption] = useState<OptionType[]>([]);
  const [formData, setFormData] = useState({
    ResidentID: "",
    HouseholdNumber: "",
    RelationID: "",
    HouseholdMembershipID: "",
  });

  const filterOption = (options: OptionType, inputValue: string) => {
    const lastName = options.label.split(",")[0]; // Extract the surname
    return lastName.toLowerCase().includes(inputValue.toLowerCase());
  };

  useEffect(() => {
    //Fetch All Residents Data to put on the Select Options
    const fetchResidents = async (item: string) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/inhabitants/residentsNotHouseholdHeadAndMemberUpdate/${item}`
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
    const fetchInhabitants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/householdMembers/getMember/${
            residentId == "0" ? 0 : residentId
          }`
        );
        setMemberData(response.data); // Store the fetched data
        fetchHouses();
        fetchResidents(response.data.ResidentID);
      } catch (err) {
        console.error("Error fetching resident:", err);
      }
    };

    fetchInhabitants();
  }, [residentId]);
  //Put Data to Form value
  useEffect(() => {
    if (Object.keys(memberData).length > 0) {
      setFormData({
        ...formData,
        RelationID: memberData.RelationID,
        HouseholdMembershipID: memberData.HouseholdMembershipID,
        ResidentID: memberData.ResidentID,
        HouseholdNumber: memberData.HouseholdNumber,
      });
    }
  }, [memberData]);

  const cleanFormData = () => {
    setFormData({
      ResidentID: "",
      HouseholdNumber: "",
      RelationID: "1",
      HouseholdMembershipID: "",
    });
  };
  // Handle input changes
  const handleReactSelectChange = (option: SingleValue<OptionType>) => {
    const value = option?.value || "";
    setMemberData({
      ...formData,
      ResidentID: value,
    });
  };
  const handleReactSelectChange2 = (option: SingleValue<OptionType>) => {
    const value = option?.value || "";
    setMemberData({
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
  };
  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);

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
          "http://localhost:5000/api/householdMembers/update",
          data
        );
        console.log("Data added successfully:", response.data);
        AddToLog("Data Update --Household Member--");
      } catch (error) {
        console.error("Error adding data:", error);
      }
    };
    addData();
    onItemClick();
    // Make your API call here
  };

  return (
    <>
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
              value={options.find(
                (option) => option.value === memberData.ResidentID
              )}
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
              value={houseOption.find(
                (option) => option.value === memberData.HouseholdNumber
              )}
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

export default UpdateForm3;
