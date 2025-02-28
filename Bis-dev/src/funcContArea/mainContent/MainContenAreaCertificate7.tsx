import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./certificateArea.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {} from "react";
import Select, { SingleValue } from "react-select";
import html2pdf from "html2pdf.js";
import BarangayBusinessPermit from "./certificates/BarangayBusinessPermit";
interface OptionType {
  value: string;
  label: string;
  date: string;
  civil: string;
  place: string;
}
const MainContentAreaCertificates7 = () => {
  // the Select Option
  const [options, setOptions] = useState<OptionType[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    business: "",
    businesno: "",
    civil: "",
    place: "",
    ctcno: "",
    orno: "",
  });
  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/inhabitants/residents11"
        );

        const transformResponse: OptionType[] = response.data.map(
          (residents: any) => ({
            value: residents.ResidentID,
            label: residents.name,
            date: residents.BirthDay,
            place: residents.PlaceOfBirth,
            civil: residents.CivilStatus,
          })
        );
        setOptions(transformResponse);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchResidents();
  }, [MainContentAreaCertificates7]);
  const handleReactSelectChange = (option: SingleValue<OptionType>) => {
    const value = option?.label || "";
    const date = option?.date || "";
    const place = option?.place || "";
    const civil = option?.civil || "";
    setFormData({
      ...formData,
      name: value,
      date: date,
      place: place,
      civil: civil,
    });
  };
  const contentRef = useRef<HTMLDivElement>(null);

  const handleExport = () => {
    console.log(formData);
    if (contentRef.current) {
      const options = {
        filename: "document.pdf",
        jsPDF: { unit: "pt", format: "a4" },
        html2canvas: { scale: 7 },
      };

      html2pdf().set(options).from(contentRef.current).save();
    }
  };
  const GenerateDocument = (item: string) => {
    const doc = new jsPDF();

    // Title and header
    doc.setFontSize(12);
    doc.text("REPUBLIC OF THE PHILIPPINES", 105, 35, { align: "center" });
    doc.text("PROVINCE OF EASTERN SAMAR", 105, 40, { align: "center" });
    doc.text("MUNICIPALITY OF ORAS", 105, 45, { align: "center" });
    doc.text("BARANGAY BUTNGA", 105, 50, { align: "center" });

    doc.setFontSize(14);
    doc.text("Office of the Punong Barangay", 105, 60, { align: "center" });

    // Document title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("BARANGAY CLEARANCE", 105, 75, { align: "center" });
    doc.setFont("helvetica", "normal");

    // Applicant's details
    doc.setFontSize(12);
    doc.text("NAME:", 20, 90);
    doc.text("SHIELA MAE A. NOFIES", 50, 90);

    doc.text("ADDRESS:", 20, 100);
    doc.text("Barangay Butnga, Oras Eastern Samar", 50, 100);

    doc.text("DATE OF BIRTH:", 20, 110);
    doc.text("January 31, 1994", 50, 110);

    doc.text("PLACE OF BIRTH:", 20, 120);
    doc.text("Oras, Eastern Samar", 50, 120);

    doc.text("CIVIL STATUS:", 20, 130);
    doc.text("Single", 50, 130);

    // Body text
    const bodyText1 = `To whom it may concern:`;
    doc.setFont("helvetica", "bold");
    doc.text(bodyText1, 20, 145);

    const bodyText2 = `This is to certify THAT SHIELA MAE A. NOFIES, whose signature appears below, has undergone the identification process of this office, and is a bonafide resident of Barangay Butnga, Oras, Eastern Samar, appearing in the permanent list of the members of the barangay assembly.`;
    doc.setFont("helvetica", "normal");
    doc.text(bodyText2, 20, 155, { maxWidth: 170, lineHeightFactor: 1.5 });

    const bodyText3 = `THAT SHE IS PERSONALLY KNOWN TO ME and the undersigned, in his official capacity, hereby vouch that she is a person of good moral character and a law-abiding citizen.`;
    doc.setFont("helvetica", "bold");
    doc.text(bodyText3, 20, 185, { maxWidth: 170, lineHeightFactor: 1.5 });

    const bodyText4 = `That she has not committed even the meanest minor violation of the Ordinances, Rules, and Regulations concerning the welfare of the community, and she is not suspected of being a member of any subversive organization.`;
    doc.setFont("helvetica", "normal");
    doc.text(bodyText4, 20, 205, { maxWidth: 170, lineHeightFactor: 1.5 });

    const bodyText5 = `This certification is issued upon the request of the interested party for whatever legal purpose this may serve.`;
    doc.setFont("helvetica", "bold");
    doc.text(bodyText5, 20, 225, { maxWidth: 170, lineHeightFactor: 1.5 });

    // Signatures
    doc.setFont("helvetica", "normal");
    doc.text("ORLANDO M. PALAÑA", 150, 250, { align: "center" });
    doc.text("Punong Barangay", 150, 255, { align: "center" });

    doc.text("__________________________", 60, 250, { align: "center" });
    doc.text("Applicant's Signature", 60, 255, { align: "center" });

    // Footer details using autoTable
    const tableData = [
      ["CTC No.:", "04473591"],
      ["Issued on:", "11/21/2024"],
      ["Issued at:", "MTO – Brgy. Butnga, Oras E. Samar"],
      ["O.R. No.:", "9784860"],
      ["Issued on:", "11/21/2024"],
      ["Issued at:", "Brgy. Butnga, Oras, E. Samar"],
      ["Amount paid:", "P50.00"],
    ];

    autoTable(doc, {
      startY: 270,
      head: [["Description", "Details"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 10 },
    });

    // Save the PDF

    doc.save("Barangay_Indigency.pdf");
  };
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
    <>
      <div style={{ display: "none" }}>
        <div ref={contentRef}>
          <BarangayBusinessPermit
            name={formData.name}
            civil={formData.civil}
            place={formData.place}
            date={formData.date}
            ctcno={formData.ctcno}
            orno={formData.orno}
            business={formData.business}
            businessno={formData.businesno}
          />
        </div>
      </div>
      <div className="CertificateMainContent">
        <div className="ParameterArea">
          <p
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "24px",
              textAlign: "center",
            }}
          >
            PARAMETERS
          </p>
          <label>Name of the Proprietor:</label>

          <input
            className="anInput"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          ></input>
          <label>Name of the Business</label>

          <input
            className="anInput"
            name="business"
            value={formData.business}
            onChange={handleChange}
            required
          ></input>
          <label>Barangay Business No.</label>
          <input
            className="anInput"
            name="businesno"
            value={formData.businesno}
            onChange={handleChange}
            required
          ></input>
          <label>CTC No.</label>
          <input
            className="anInput"
            name="ctcno"
            value={formData.ctcno}
            onChange={handleChange}
            required
          ></input>
          <label>OR No.</label>
          <input
            className="anInput"
            name="orno"
            value={formData.orno}
            onChange={handleChange}
            required
          ></input>
          <button
            onClick={() => {
              handleExport();
            }}
          >
            {" "}
            Generate{" "}
          </button>
        </div>
        <div className="PreviewArea">
          <BarangayBusinessPermit
            name={formData.name}
            civil={formData.civil}
            place={formData.place}
            date={formData.date}
            ctcno={formData.ctcno}
            orno={formData.orno}
            business={formData.business}
            businessno={formData.businesno}
          />
        </div>
      </div>
      <div>
        {/*
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          <p>Click here to download the PDF file.</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => {
                onGenerateDocument();
              }}
              type="button"
            ></button>
          </div>
        </div>
      </div>*/}
      </div>
    </>
  );
};

export default MainContentAreaCertificates7;
