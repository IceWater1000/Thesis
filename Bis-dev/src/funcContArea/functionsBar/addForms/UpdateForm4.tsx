import React, { useState } from "react";
import axios from "axios";
import Select, { SingleValue } from "react-select";
import { useEffect } from "react";
interface Props {
  residentId: string;
  onItemClick: () => void;
}
interface OptionType {
  value: string;
  label: string;
}
const UpdateForm4 = ({ residentId, onItemClick }: Props) => {
  const [memberData, setMemberData] = useState<any>({});
  const [formData, setFormData] = useState({
    Id: "",
    SeniorCitizenNumber: "",
    ContactNumber: "",
    EmailAddress: "",
    SeniorID: "",
  });
  const [options, setOptions] = useState<OptionType[]>([]);
  //populating Select Options
  useEffect(() => {
    //Fetch All Residents Data to put on the Select Options
    const fetchResidents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/inhabitants/residents"
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

    fetchResidents();
  }, [UpdateForm4]);
  //getting the information of the data to be updated
  useEffect(() => {
    const fetchInhabitants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/seniorCitizen/getMember/${
            residentId == "0" ? 0 : residentId
          }`
        );
        setMemberData(response.data); // Store the fetched data
      } catch (err) {
        console.error("Error fetching resident:", err);
      }
    };

    fetchInhabitants();
  }, [residentId]);
  //setting the ingormation of the data to the formdata
  useEffect(() => {
    if (Object.keys(memberData).length > 0) {
      setFormData({
        Id: memberData.ResidentID,
        SeniorCitizenNumber: memberData.SeniorCitizenNumber,
        ContactNumber: memberData.ContactNumber,
        EmailAddress: memberData.Email,
        SeniorID: memberData.SeniorCitizenID,
      });
    }
  }, [memberData]);
  const cleanFormData = () => {
    setFormData({
      Id: "",
      SeniorCitizenNumber: "",
      ContactNumber: "",
      EmailAddress: "",
      SeniorID: "",
    });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const addSC = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/seniorCitizen/update",
          formData
        );
        console.log("Data added successfully:", response.data);
      } catch (error) {
        console.error("Error adding data:", error);
      }
    };
    addSC();
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
            Senior Citizen Form
          </p>
          <div className="formContainer">
            <label className="labels">Resident</label>
            <Select
              options={options}
              name="ResidentID"
              id="ResidentID"
              value={options.find((option) => option.value === formData.Id)}
              onChange={handleReactSelectChange}
              className="reactSelect"
              required
              //isMulti={false} // Set to true for multi-select
            />
          </div>
          <div className="formContainer">
            <label className="labels">Senior Citizen Number:</label>
            <input
              className="input"
              type="text"
              id="SeniorCitizenNumber"
              name="SeniorCitizenNumber"
              value={formData.SeniorCitizenNumber}
              onChange={handleChange}
              required
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

export default UpdateForm4;
