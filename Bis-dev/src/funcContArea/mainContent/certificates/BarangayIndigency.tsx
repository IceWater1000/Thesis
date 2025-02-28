import React from "react";
import "./BarangayIndigency.css";
interface Props {
  name: string;
  date: string;
  place: string;
  civil: string;
  ctcno: string;
  orno: string;
}
const BarangayIndigency = ({
  name,
  date,
  place,
  civil,
  ctcno,
  orno,
}: Props) => {
  const today = new Date(Date.now());

  const currentDay = today.getDate();

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
        <p className="h1s">Office of the Punong Barangay</p>
        <p className="h2">
          <strong>Certificate of Indigency</strong>
        </p>

        <p className="regular">
          <span className="regularBold">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; THIS IS TO CERTIFY{" "}
          </span>
          that{" "}
          <span className="regularBold" style={{ textDecoration: "underline" }}>
            {name.toUpperCase()}
          </span>{" "}
          of legal age, single/married/widow is a bonafide resident of Barangay,
          Butnga, Oras, Eastern Samar and personally known by the undersigned of
          good moral.<br></br>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;This
            Further certifies that the above-named person is known to me that
            she/he is one of those who belong to INDIGENT FAMILY in this
            Barangay.
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; THIS
            CERTIFICATION is being issued upon the request of whatever legal
            purpose it may serve.<br></br>
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
              marginTop: "200px",
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
      </div>
    </>
  );
};

export default BarangayIndigency;
