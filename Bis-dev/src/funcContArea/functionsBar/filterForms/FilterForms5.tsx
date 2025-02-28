import React, { useState } from "react";
import axios from "axios";
import "./filterform.css";
interface Props {
  onItemClick: () => void;
  onFilterSave: (item: object) => void;
}

const FilterForms5 = ({ onItemClick, onFilterSave }: Props) => {
  // State for form data
  const [formData, setFormData] = useState({
    youthClassification: "",
    youthAgeGroup: "",
    highestEducationalAttainment: "",
    workStatus: "",
  });
  const cleanFormData = () => {
    setFormData({
      youthClassification: "",
      youthAgeGroup: "",
      highestEducationalAttainment: "",
      workStatus: "",
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
          <label className="labels">Youth Classification:</label>
          <select
            id="youthClassification"
            name="youthClassification"
            value={formData.youthClassification}
            onChange={handleChange}
            defaultValue={""}
            required
          >
            <option value=""></option>
            <option value="In School Youth">In School Youth</option>
            <option value="Out of School Youth">Out of School Youth</option>
            <option value="Working Youth">Working Youth</option>
            <option value="Youth with Specific Needs">
              Youth with Specific Needs
            </option>
          </select>
        </div>

        <div className="filterFormContainer">
          <label className="labels">Youth Age Group:</label>
          <select
            id="youthAgeGroup"
            name="youthAgeGroup"
            value={formData.youthAgeGroup}
            onChange={handleChange}
            defaultValue={""}
            required
          >
            <option value=""></option>
            <option value="Child Youth (15-17 Years Old)">
              Child Youth &#40; 15-17 years old&#41;
            </option>
            <option value="Core Youth (18-24 Years Old)">
              Core Youth &#40; 18-24 years old&#41;
            </option>
            <option value="Young Adult (24-30 Years Old)">
              Young Adult &#40; 24-30 years old&#41;
            </option>
          </select>
        </div>

        <div className="filterFormContainer">
          <label className="labels">Highest Educational Attainment:</label>

          <select
            id="highestEducationalAttainment"
            name="highestEducationalAttainment"
            value={formData.highestEducationalAttainment}
            onChange={handleChange}
            defaultValue={""}
            required
          >
            <option value=""></option>
            <option value="Elementary Level">Elementary Level</option>
            <option value="Elementary Grad">Elementary Grad</option>
            <option value="Highschool Level">Highschool Level</option>
            <option value="Highschool Grad">Highschool Grad</option>
            <option value="Vocational Grad">Vocational Grad</option>
            <option value="College Level">College Level</option>
            <option value="College Grad">College Grad</option>
            <option value="Masters Level">Masters Level</option>
            <option value="Masters Grad">Masters Grad</option>
            <option value="Doctorate Level">Doctorate Level</option>
            <option value="Doctorate Grad">Doctorate Grad</option>
          </select>
        </div>

        <div className="filterFormContainer">
          <label className="labels">Work Status:</label>
          <select
            id="workStatus"
            name="workStatus"
            value={formData.workStatus}
            onChange={handleChange}
            defaultValue={""}
            required
          >
            <option value=""></option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Currently Looking for a Job">
              Currently Looking for a Job
            </option>
            <option value="Not Interested Looking for a Job">
              Not Interested Looking for a Job
            </option>
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
              onFilterSave(formData);
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

export default FilterForms5;
