import React, { useState } from "react";
import jsPDF from "jspdf";
import "./functionsBar.css";
interface Props {
  onCertificateChange: (item: string) => void;
}
const FunctionsBarCI = ({ onCertificateChange }: Props) => {
  const handlechange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onCertificateChange(event?.target.value);
  };

  return (
    <>
      <div className="functionsBar first">
        <select
          id="options"
          name="options"
          className="functionsBarSelect"
          onChange={handlechange}
        >
          <option value="Barangay Clearance">Barangay Clearance</option>
          <option value="Barangay Indigency">Barangay Indigency</option>
          <option value="Barangay Crisis">
            Certificate of Person in Crisis Situation
          </option>
          <option value="Barangay Certification">Barangay Certification</option>
          <option value="Business Clearance">
            Barangay Business Clearance
          </option>
          <option value="Certificate of Good Moral">
            Certificate of Good Moral Character
          </option>
          <option value="Barangay Permit">Barangay Business Permit</option>
        </select>
      </div>
    </>
  );
};

export default FunctionsBarCI;
