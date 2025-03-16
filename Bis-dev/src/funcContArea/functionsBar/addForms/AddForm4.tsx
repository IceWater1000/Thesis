import React, { useState } from "react";
import axios from "axios";
import Select, { SingleValue } from "react-select";
import { useEffect } from "react";
import { useSelectAddformReload } from "../../../utilities/SelectAdformDataReload";
interface Props {
  onItemClick: () => void;
}
interface OptionType {
  value: string;
  label: string;
}
const AddForm4 = ({ onItemClick }: Props) => {
  const [formData, setFormData] = useState({
    Id: "",
    SeniorCitizenNumber: "",
    ContactNumber: "",
    EmailAddress: "",
  });
  // for reloading the options when a data is added or deleted
  const { SelectReload } = useSelectAddformReload();
  const [options, setOptions] = useState<OptionType[]>([]);
  const filterOption = (options: OptionType, inputValue: string) => {
    const lastName = options.label.split(",")[0]; // Extract the surname
    return lastName.toLowerCase().includes(inputValue.toLowerCase());
  };
  const cleanFormData = () => {
    setFormData({
      Id: "",
      SeniorCitizenNumber: "",
      ContactNumber: "",
      EmailAddress: "",
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
    cleanFormData();
  };
  const submitFormData = (data: typeof formData) => {
    const addSC = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/inhabitants/addSC",
          formData
        );
        console.log("Data added successfully:", response.data);
      } catch (error) {
        console.error("Error adding data:", error);
      }
    };
    addSC();

    onItemClick();
    alert("Data Added Successfully");
  };
  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/inhabitants/residentsNotSeniorCitizenAndValid"
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
  }, [formData, SelectReload]);
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
              value={
                options.find((option) => option.value === formData.Id) || null
              }
              onChange={handleReactSelectChange}
              filterOption={filterOption}
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
                cleanFormData();
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

export default AddForm4;
