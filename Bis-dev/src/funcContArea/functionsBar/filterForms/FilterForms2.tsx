import React, { useState } from "react";
import axios from "axios";
import "./filterform.css";
interface Props {
  onItemClick: () => void;
  onFilterSave: (item: object) => void;
}

const FilterForms2 = ({ onItemClick, onFilterSave }: Props) => {
  // State for form data
  const [formData, setFormData] = useState({
    address: "",
    totalInhabitants1: "0",
    totalInhabitants2: "",
  });
  const cleanFormData = () => {
    setFormData({
      address: "",
      totalInhabitants1: "0",
      totalInhabitants2: "",
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
            <option value="1">Zone 1</option>
            <option value="2">Zone 2</option>
            <option value="3">Zone 3</option>
            <option value="4">Zone 4</option>
          </select>
        </div>

        <div className="filterFormContainer">
          <label className="labels">Total Inhabitants</label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              style={{ flexGrow: "1" }}
              className="input"
              type="number"
              id="totalInhabitants1"
              name="totalInhabitants1"
              value={formData.totalInhabitants1}
              onChange={handleChange}
              required
            />
            -
            <input
              style={{ flexGrow: "1" }}
              className="input"
              type="number"
              id="totalInhabitants2"
              name="totalInhabitants2"
              value={formData.totalInhabitants2}
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

export default FilterForms2;
