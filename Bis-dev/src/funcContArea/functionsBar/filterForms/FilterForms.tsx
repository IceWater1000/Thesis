import React, { useState } from "react";
import axios from "axios";
import "./filterform.css";
interface Props {
  onItemClick: () => void;
  onFilterSave: (item: object) => void;
}

const FilterForms = ({ onItemClick, onFilterSave }: Props) => {
  // State for form data
  const [formData, setFormData] = useState({
    address: "",
    sex: "",
    civilStatus: "",
    occupation: "",
    citizenship: "",
    ageRange1: "",
    ageRange2: "",
    status: "alive",
  });
  const cleanFormData = () => {
    setFormData({
      address: "",
      sex: "",
      civilStatus: "",
      occupation: "",
      citizenship: "",
      ageRange1: "",
      ageRange2: "",
      status: "alive",
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
          <label className="labels">Address:</label>
          <select
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            defaultValue={""}
            required
          >
            <option value=""></option>
            <option value="1, Butnga, Oras">Zone 1</option>
            <option value="2, Butnga, Oras">Zone 2</option>
            <option value="3, Butnga, Oras">Zone 3</option>
            <option value="4, Butnga, Oras">Zone 4</option>
          </select>
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
            <option value="Male">Male</option>
            <option value="Female">Female</option>
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
        <div className="filterFormContainer">
          <label className="labels">Life Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            defaultValue={"alive"}
            required
          >
            <option value="alive">Alive</option>
            <option value="deceased">Deceased</option>
            <option value="transferred">Transferred</option>
          </select>
        </div>
        <div className="filterFormContainer" style={{ marginTop: "10px" }}>
          <button className="buttons" type="button" onClick={cleanFormData}>
            Reset
          </button>
          <button
            className="buttons"
            type="button"
            onClick={() => {
              onItemClick();
              onFilterSave(formData);
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

export default FilterForms;
