import React from "react";
import "./BarangayIndigency.css";
interface Props {
  name: string;
  date: string;
  place: string;
  civil: string;
  ctcno: string;
  orno: string;
  business: string;
  businessno: string;
}
const BarangayBusinessPermit = ({
  name,
  business,
  businessno,
  date,
  place,
  civil,
  ctcno,
  orno,
}: Props) => {
  const today = new Date(Date.now());

  const currentDay = today.getDate();

  const dates = new Date(Date.now());
  const formattedDate = dates.toISOString().split("T")[0];
  // Get the current month (e.g., January, February, etc.)
  const monthOptions: Intl.DateTimeFormatOptions = { month: "long" }; // Use a literal type
  const currentMonth = today.toLocaleDateString("en-US", monthOptions);

  return (
    <>
      <div className="clearanceMain">
        <img className="backgroundImages2" src="/Images/asd.png" />

        <div className="theHead">
          <div className="logCont" style={{ marginLeft: "40px" }}>
            <img
              style={{ width: "100px", height: "100px" }}
              src="/Images/Oras.png"
            />
          </div>
          <div className="theHeadText">
            <p>REPUBLIC OF THE PHILIPPINES </p>
            <p>PROVINCE OF EASTERN SAMAR</p>
            <p>MUNICIPALITY of ORAS</p>
            <p className="new">Barangay Butnga</p>
          </div>
          <div className="logCont" style={{ marginRight: "40px" }}>
            <img
              style={{ width: "100px", height: "100px" }}
              src="/Images/asd.png"
            />
          </div>
        </div>
        <hr className="topHR"></hr>
        <p className="h4">OFFICE OF THE PUNONG BARANGAY</p>
        <p className="h2s">
          <strong>BARANGAY BUSINESS PERMIT</strong>
        </p>
        <p>
          Name of Business:{" "}
          <span style={{ color: "playing", fontWeight: "bold" }}>
            {business}
          </span>
        </p>
        <div className="permitTable">
          <div className="f1">Proprietor</div>
          <div>
            <span style={{ color: "playing", fontWeight: "bold" }}>{name}</span>
          </div>
        </div>
        <div className="permitTable">
          <div className="f1">Permit Number:</div>
          <div>
            <span style={{ color: "playing", fontWeight: "bold" }}>
              {businessno}
            </span>
          </div>
        </div>
        <div className="permitTable">
          <div className="f1">Address:</div>
          <div style={{ color: "playing", fontWeight: "bold" }}>
            Barangay Butnga, Oras, Eastern Samar
          </div>
        </div>
        <div className="permitTable">
          <div className="f1">Bussiness Location:</div>
          <div style={{ color: "playing", fontWeight: "bold" }}>
            Barangay Butnga, Oras, Eastern Samar
          </div>
        </div>
        <div className="permitTable">
          <div className="f1">Status:</div>
          <div style={{ color: "playing", fontWeight: "bold" }}>Oprating</div>
        </div>
        <p className="regular">TO WHOM IT MAY CONCERN:</p>
        <p className="regular">
          <span className="regularBold">THIS IS TO CERTIFY </span>
          that{" "}
          <span className="regularBold" style={{ textDecoration: "underline" }}>
            {name.toUpperCase()}
          </span>{" "}
          This permit is being issued subject to existing rules and regulations,
          provided however, that the necessary fees are paid to the treasurer of
          the Barangay as assessed.<br></br>
          <p style={{ marginTop: "0" }}>
            This is non-transferable and shall be deemed null and void upon
            failure by the owner to follow the said rules and regulations set
            forth by the Local Government Unit of Oras, Eastern Samar
          </p>
          <p>
            Given this day{" "}
            <span
              className="regularBold"
              style={{ textDecoration: "underline" }}
            >
              {currentDay}
            </span>{" "}
            of{" "}
            <span
              className="regularBold"
              style={{ textDecoration: "underline" }}
            >
              {currentMonth}
            </span>{" "}
            , 2024 at Barangay Butnga, Oras , Eastern Samar.
          </p>
        </p>
        <div style={{ marginLeft: "auto" }}>
          <p
            style={{
              fontFamily: "Calibri",
              color: "black",
              fontSize: "14pt",
              fontWeight: "bold",
              textDecoration: "underline",
              marginTop: "4px",
              marginBottom: "0",
              textAlign: "center",
            }}
          >
            Orlando M. Palana
          </p>
          <p className="regular" style={{ margin: "0", textAlign: "center" }}>
            Punong Barangay
          </p>
        </div>
        <p>Barangay Business Clearance No. {businessno}</p>
        <table className="tables2">
          <tr>
            <td className="tds">CTC No.</td>
            <td className="tds"> {ctcno}</td>
          </tr>
          <tr>
            <td className="tds">Issued On</td>
            <td className="tds">{formattedDate} </td>
          </tr>
          <tr>
            <td className="tds">Issued At</td>
            <td className="tds">MTO - Brgy. Butnga. Oras E. Samar</td>
          </tr>
          <tr>
            <td className="tds">OR No.</td>
            <td className="tds">{orno}</td>
          </tr>
          <tr>
            <td className="tds">Issued On</td>
            <td className="tds">{formattedDate}</td>
          </tr>
          <tr>
            <td className="tds">Amount Paid</td>
            <td className="tds">P100.00</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default BarangayBusinessPermit;
