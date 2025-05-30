import React, { useState } from "react";
import axios from "axios";
import Select, { SingleValue } from "react-select";
import { useEffect } from "react";
import AddToLog from "../../../Logging";
interface Props {
  residentId: string;
  onItemClick: () => void;
}
interface OptionType {
  value: string;
  label: string;
}
const UpdateForm5 = ({ residentId, onItemClick }: Props) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const filterOption = (options: OptionType, inputValue: string) => {
    const lastName = options.label.split(",")[0]; // Extract the surname
    return lastName.toLowerCase().includes(inputValue.toLowerCase());
  };

  const [memberData, setMemberData] = useState<any>({});
  const [formData, setFormData] = useState({
    Id: "",
    ContactNumber: "",
    EmailAddress: "",
    YouthClassification: "1",
    YouthAgeGroup: "1",
    HighestEducationalAttainmentID: "1",
    WorkStatus: "1",
    KKMemberID: "",
  });
  const cleanFormData = () => {
    setFormData({
      Id: "",
      ContactNumber: "",
      EmailAddress: "",
      YouthClassification: "1",
      YouthAgeGroup: "1",
      HighestEducationalAttainmentID: "1",
      WorkStatus: "1",
      KKMemberID: "",
    });
  };

  //getting the information of the data to be updated
  useEffect(() => {
    //Populating Select

    const fetchResidents = async (item: string) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/inhabitants/residentsNotKKAndValidUpdate/${item}`
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
          `http://localhost:5000/api/KKMembers/getMember/${
            residentId == "0" ? 0 : residentId
          }`
        );
        setMemberData(response.data); // Store the fetched data
        fetchResidents(response.data.ResidentID);
      } catch (err) {
        console.error("Error fetching resident:", err);
      }
    };

    fetchInhabitants();
  }, [residentId]);
  //setting the information to the formdata
  useEffect(() => {
    if (Object.keys(memberData).length > 0) {
      setFormData({
        Id: memberData.ResidentID,
        ContactNumber: memberData.ContactNumber,
        EmailAddress: memberData.EmailAddress,
        YouthClassification: memberData.YouthClassification,
        YouthAgeGroup: memberData.YouthAgeGroup,
        HighestEducationalAttainmentID:
          memberData.HighestEducationalAttainmentID,
        WorkStatus: memberData.WorkStatus,
        KKMemberID: memberData.KKMemberID,
      });
    }
  }, [memberData]);
  console.log(memberData);
  console.log(formData);
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
      Id: value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitFormData(formData);
  };
  const submitFormData = (data: typeof formData) => {
    const addKK = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/KKMembers/update",
          formData
        );
        console.log("Data added successfully:", response.data);
        AddToLog("Data Update --KK Member--");
      } catch (error) {
        console.error("Error adding data:", error);
      }
    };
    addKK();
    onItemClick();
  };
  return (
    <>
      <div className="container" style={{ width: "400px" }}>
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
            KK Members Form
          </p>

          <div className="formContainer">
            <label className="labels">Resident</label>
            <Select
              options={options}
              name="ResidentID"
              id="ResidentID"
              value={options.find((option) => option.value === formData.Id)}
              filterOption={filterOption}
              onChange={handleReactSelectChange}
              className="reactSelect"
              required
              //isMulti={false} // Set to true for multi-select
            />
          </div>
          <div className="formContainer">
            <label className="labels">Contact #:</label>
            <input
              className="input"
              type="text"
              id="ContactNumber"
              name="ContactNumber"
              value={formData.ContactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formContainer">
            <label className="labels">Email Address:</label>
            <input
              className="input"
              type="email"
              id="EmailAddress"
              name="EmailAddress"
              value={formData.EmailAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formContainer">
            <label className="labels">Youth Classification:</label>
            <select
              className="select"
              id="YouthClassification"
              name="YouthClassification"
              value={formData.YouthClassification}
              onChange={handleChange}
              required
              defaultValue={1}
            >
              <option value="1">In School Youth</option>
              <option value="2">Out of School Youth</option>
              <option value="3">Working Youth</option>
              <option value="4">Youth With Specific Needs</option>
            </select>
          </div>
          <div className="formContainer">
            <label className="labels">Youth Age Group:</label>
            <select
              className="select"
              id="YouthAgeGroup"
              name="YouthAgeGroup"
              value={formData.YouthAgeGroup}
              onChange={handleChange}
              required
              defaultValue={1}
            >
              <option value="1">Child Youth (15-17 yrs old)</option>
              <option value="2">Core Youth (18-24 yrs old)</option>
              <option value="3">Young Adult (15-30 yrs old)</option>
            </select>
          </div>
          <div className="formContainer">
            <label className="labels">Highest Educational Attainment</label>
            <select
              className="select"
              id="HighestEducationalAttainmentID"
              name="HighestEducationalAttainmentID"
              value={formData.HighestEducationalAttainmentID}
              onChange={handleChange}
              required
              defaultValue={1}
            >
              <option value="1">Elementary Level</option>
              <option value="2">Elementary Grad</option>
              <option value="3">High School Level</option>
              <option value="4">High School Grad</option>
              <option value="5">Vocational Grad</option>
              <option value="6">College Level</option>
              <option value="7">College Grad</option>
              <option value="8">Masters Level</option>
              <option value="9">Masters Grad</option>
              <option value="10">Doctorate Level</option>
              <option value="11">Doctorate Graduate</option>
            </select>
          </div>
          <div className="formContainer">
            <label className="labels">Work Status</label>
            <select
              className="select"
              id="WorkStatus"
              name="WorkStatus"
              value={formData.WorkStatus}
              onChange={handleChange}
              required
              defaultValue={1}
            >
              <option value="1">Employed</option>
              <option value="2">Unemployed</option>
              <option value="3">Self-Employed</option>
              <option value="4">Currently looking for a Job</option>
              <option value="5">Not Interested Looking for a Job</option>
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

export default UpdateForm5;
