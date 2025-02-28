import React, { useState } from "react";
import axios from "axios";
import Select, { SingleValue } from "react-select";
import { useEffect } from "react";
interface Props {
  onItemClick: () => void;
  theID: string;
}

const UpdateForm6 = ({ onItemClick, theID }: Props) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const [sData, setResidentData] = useState<any>({});

  //set
  const [formData, setFormData] = useState({
    Id: "",
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
      Id: "",
      NameOfComplainant: "",
      NameOfComplaint: "",
      NameOfRespondents: "",
      ComplainDetails: "",
      CaseNo: "",
      DateWritten: "",
      IsResolve: "No",
    });
  };
  useEffect(() => {
    const fetchInhabitants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/lupon/getMember/${
            theID == "0" ? "1" : theID
          }`
        );
        console.log(response.data);
        setResidentData(response.data); // Store the fetched data
      } catch (err) {
        console.error("Error fetching resident:", err);
      }
    };

    fetchInhabitants();
  }, [theID]);
  useEffect(() => {
    if (Object.keys(sData).length > 0) {
      setFormData({
        Id: sData.Id,
        NameOfComplainant: sData.NameOfComplainant,
        NameOfComplaint: sData.NameOfComplaint,
        NameOfRespondents: sData.NameOfRespondents,
        ComplainDetails: sData.ComplainDetails,
        CaseNo: sData.CaseNo,
        DateWritten: sData.DateWritten,
        IsResolve: sData.IsResolve,
      });
    }
  }, [sData]);
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitFormData(formData);
  };
  const submitFormData = (data: typeof formData) => {
    setFormData({
      ...formData,
      DateWritten: getCurrentDate(),
    });

    const addKK = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/lupon/update",
          formData
        );
        console.log("Data added successfully:", response.data);
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
            Lupon Records Update Form
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
            <label className="labels">Name of Respondents: </label>
            <input
              className="input"
              type="text"
              id="CaseNo"
              name="CaseNo"
              value={formData.CaseNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formContainer">
            <label className="labels">Is Resolved</label>
            <select
              id="IsResolve"
              name="IsResolve"
              value={formData.IsResolve}
              onChange={handleChange}
              required
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
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
    </>
  );
};

export default UpdateForm6;
