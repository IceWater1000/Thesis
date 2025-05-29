import React, { useState } from "react";
import axios from "axios";
import Select, { SingleValue } from "react-select";
import { useEffect } from "react";
import AddToLog from "../../../Logging";
interface Props {
  onItemClick: () => void;
}

const AddForm6 = ({ onItemClick }: Props) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const [formData, setFormData] = useState({
    NameOfComplainant: "",
    NameOfComplaint: "",
    NameOfRespondents: "",
    ComplainDetails: "",
    CaseNo: "",
    DateWritten: "",
    IsResolve: "No",
  });
  const cleanFormData = () => {
    setFormData({
      NameOfComplainant: "",
      NameOfComplaint: "",
      NameOfRespondents: "",
      ComplainDetails: "",
      CaseNo: "",
      DateWritten: "",
      IsResolve: "No",
    });
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitFormData();
    cleanFormData();
  };
  const submitFormData = () => {
    const curDate = getCurrentDate();
    const addKK = async () => {
      const dataToSubmit = {
        ...formData,
        DateWritten: curDate,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/lupon/add",
          dataToSubmit
        );
        console.log("Data added successfully:", response.data);
        AddToLog("Data Added --Lupon Record--");
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
            Lupon Records Add Form
          </p>

          <div className="formContainer">
            <label className="labels">Name of Complainant: </label>
            <input
              className="input"
              type="text"
              id="NameOfComplainant"
              name="NameOfComplainant"
              value={formData.NameOfComplainant}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formContainer">
            <label className="labels">Name of Complaint: </label>
            <input
              className="input"
              type="text"
              id="NameOfComplaint"
              name="NameOfComplaint"
              value={formData.NameOfComplaint}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formContainer">
            <label className="labels">Name of Respondents: </label>
            <input
              className="input"
              type="text"
              id="NameOfRespondents"
              name="NameOfRespondents"
              value={formData.NameOfRespondents}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formContainer">
            <label className="labels">Complain Details: </label>
            <textarea
              style={{ width: "447px", height: "30vh" }}
              value={formData.ComplainDetails}
              id="ComplainDetails"
              name="ComplainDetails"
              onChange={handleChange}
              placeholder="The Details of the Complain...."
              rows={4}
              cols={50}
            />
          </div>
          <div className="formContainer">
            <label className="labels">Case Number: </label>
            <input
              className="input"
              type="number"
              id="CaseNo"
              name="CaseNo"
              value={formData.CaseNo}
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

export default AddForm6;
