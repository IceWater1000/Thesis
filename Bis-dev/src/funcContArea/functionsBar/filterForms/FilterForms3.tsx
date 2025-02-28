import React, { useState } from "react";
import axios from "axios";
import "./filterform.css";
interface Props {
  onItemClick: () => void;
  onFilterSave: (item: object) => void;
}

const FilterForms3 = ({ onItemClick, onFilterSave }: Props) => {
  // State for form data
  const [formData, setFormData] = useState({
    householdNumber: "",
    sex: "",
    civilStatus: "",
    occupation: "",
    citizenship: "",
    ageRange1: "",
    ageRange2: "",
  });
  const cleanFormData = () => {
    setFormData({
      householdNumber: "",
      sex: "",
      civilStatus: "",
      occupation: "",
      citizenship: "",
      ageRange1: "",
      ageRange2: "",
    });
  };
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

  return (
    <div className="MainContainer">
      <div className="filterFormHeader">Filter Form</div>
      <div className="filterForms">
        <div className="filterFormContainer">
          <label className="labels">Household Number</label>
          <input
            type="number"
            id="householdNumber"
            name="householdNumber"
            value={formData.householdNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="filterFormContainer">
          <label className="labels">Sex:</label>
          <select
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            defaultValue={""}
            required
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="filterFormContainer">
          <label className="labels">Civil Status:</label>

          <select
            id="civilStatus"
            name="civilStatus"
            value={formData.civilStatus}
            onChange={handleChange}
            defaultValue={""}
            required
          >
            <option value=""></option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Separated">Separated</option>
            <option value="Widowed">Widowed</option>
            <option value="Annulled">Annulled</option>
            <option value="Unknown">Unknown</option>
            <option value="Live-in">Live-in</option>
          </select>
        </div>

        <div className="filterFormContainer">
          <label className="labels">Occupation:</label>
          <input
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            defaultValue={""}
            required
          />
        </div>

        <div className="filterFormContainer">
          <label className="labels">Citizenship:</label>
          <select
            id="citizenship"
            name="citizenship"
            value={formData.citizenship}
            onChange={handleChange}
            defaultValue={""}
            required
          >
            <option value=""></option>
            <option value="Filipino">Filipino</option>
            <option value="American">American</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>
        <div className="filterFormContainer">
          <label className="labels">Age Range:</label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              style={{ flexGrow: "1" }}
              className="input"
              type="number"
              id="ageRange1"
              name="ageRange1"
              value={formData.ageRange1}
              onChange={handleChange}
              required
            />
            -
            <input
              style={{ flexGrow: "1" }}
              className="input"
              type="number"
              id="ageRange2"
              name="ageRange2"
              value={formData.ageRange2}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="filterFormContainer" style={{ marginTop: "10px" }}>
          <button className="buttons" type="button" onClick={cleanFormData}>
            Reset
          </button>
          <button
            className="buttons"
            type="button"
            onClick={() => {
              onFilterSave(formData);
              console.log(formData);
              onItemClick();
            }}
          >
            Filter
          </button>
          <button className="buttons" type="button" onClick={onItemClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterForms3;
