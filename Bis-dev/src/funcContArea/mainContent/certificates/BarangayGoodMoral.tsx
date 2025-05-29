import React from "react";
import "./BarangayIndigency.css";
interface Props {
  name: string;
  date: string;
  place: string;
  purpose: string;
  civil: string;
  ctcno: string;
  orno: string;
  business: string;
  businessno: string;
  ave: string;
}
const BarangayGoodMoral = ({
  name,
  business,
  ave,
  purpose,
  businessno,
  date,
  place,
  civil,
  ctcno,
  orno,
}: Props) => {
  console.log(civil);
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

        <p className="h4">Office of the Punong Barangay</p>
        <p className="h3">CERTIFICATE OF GOOD MORAL CHARACTER</p>
        <p className="regular">TO WHOM IT MAY CONCERN:</p>
        <p className="regular">
          <span className="regularBold">THIS IS TO CERTIFY </span>
          that{" "}
          <span className="regularBold" style={{ textDecoration: "underline" }}>
            {name.toUpperCase()}
          </span>{" "}
          Filipino,
          <span className="regularBold" style={{ textDecoration: "underline" }}>
            {" " + civil + ""}
          </span>{" "}
          with postal address of Avenue{" "}
          <span className="regularBold" style={{ textDecoration: "underline" }}>
            {" " + ave + " "}
          </span>
          , Barangay Butnga, Oras, Eastern Samar, that his signature appears
          hereon shows that he is a low-abiding citizen and no derogatory record
          that may affect his reputation and social standing in this community.
          <br></br>
          <p className="h1s" style={{ marginTop: "40px" }}>
            BARANGAY BUSINESS CLEARANCE
          </p>
          <p style={{ marginTop: "40px" }}>
            THIS CERTIFICATION, is being issued upon request of the interested
            party for
            <span
              className="regularBold"
              style={{ textDecoration: "underline" }}
            >
              {" " + purpose + " "}
            </span>
            and for whatever legal purpose it may serve.
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
              marginTop: "140px",
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
        <div style={{ width: "200px" }}>
          <hr style={{ margin: "0", textAlign: "center" }}></hr>
          <p
            className="regular"
            style={{ fontStyle: "italic", margin: "0", textAlign: "center" }}
          >
            Applicants Signature
          </p>
        </div>
      </div>
    </>
  );
};

export default BarangayGoodMoral;
