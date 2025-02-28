import React, { useState } from "react";
import "./dForms.css";
interface Props {
  onItemClick: () => void;
}
const OfficialsAddForm = ({ onItemClick }: Props) => {
  const [val, setVal] = useState("");
  const [val2, setVal2] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVal(value);
  };
  return (
    <div>
      <div className="theForm">
        <div style={{ display: "flex", gap: "24px" }}>
          <p className="tl">Adding New Sets of Officials</p>
          <button
            onClick={() => {
              onItemClick();
            }}
          >
            Exit
          </button>
        </div>
        <div className="newRow">
          <label>Year: </label>
          <input
            className="input2"
            type="text"
            name="name"
            placeholder="2025"
            value={val}
            onChange={handleChange}
          />
          <div>-</div>
          <input
            className="input2"
            type="text"
            name="name"
            placeholder="2026"
            onChange={handleChange}
          />
        </div>
        <button className="fButton" onClick={onItemClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default OfficialsAddForm;
