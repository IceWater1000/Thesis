import React from "react";
import "./BarangayClearance.css";
interface Props {
  name: string;
  date: string;
  place: string;
  civil: string;
  ctcno: string;
  orno: string;
}
const BarangayClearance = ({
  name,
  date,
  place,
  civil,
  ctcno,
  orno,
}: Props) => {
  const dates = new Date(Date.now());
  const formattedDate = dates.toISOString().split("T")[0];

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
            <p className="new">BARANGAY BUTNGA</p>
          </div>
          <div className="logCont" style={{ marginRight: "40px" }}>
            <img
              style={{ width: "100px", height: "100px" }}
              src="/Images/asd.png"
            />
          </div>
        </div>
        <p className="h1">Office of the Punong Barangay</p>
        <p className="h2">BARANGAY CLEARANCE</p>
        <table className="tables">
          <tr>
            <td className="tds">
              <strong>NAME:</strong>
            </td>
            <td className="tds" colSpan={3}>
              {name}
            </td>
          </tr>
          <tr>
            <td className="tds">
              <strong>ADDRESS:</strong>
            </td>
            <td className="tds" colSpan={3}>
              Barangay Butnga, Oras Eastern Samar
            </td>
          </tr>
          <tr>
            <td className="tds">
              <strong>DATE OF BIRTH:</strong>
            </td>
            <td className="tds">{date}</td>
            <td className="tds" rowSpan={2}>
              <strong>PLACE OF BIRTH:</strong>
            </td>
            <td className="tds" rowSpan={2}>
              {place}
            </td>
          </tr>
          <tr>
            <td className="tds">
              <strong>CIVIL STATUS:</strong>
            </td>
            <td className="tds">{civil}</td>
          </tr>
        </table>
        <p className="regularBold">To whom it may concern:</p>
        <p className="regular">
          <span className="regularBold">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This is to certify{" "}
          </span>
          THAT{" "}
          <span className="regularBold" style={{ textDecoration: "underline" }}>
            {name.toUpperCase()}
          </span>
          , whose signature appears below, has undergone the identification
          process of this office, and is a bonafide resident of Barangay Butnga,
          Oras, Eastern Samar, appearing in the permanent list of the members of
          the barangay assembly. <br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;THAT
          HE/SHE IS PERSONALLY KNOWN TO ME and the undersigned, in his official
          capacity, hereby vouch that he/she is a person of good moral character
          and a law abiding citizen.
          <br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; That
          he/she has not committed even meanest minor violation of the
          Ordinances, Rules and Regulations concerning the welfare of the
          community, and he/she is not suspected of being a member of any
          subversive organization.<br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;This
          certification is issued upon the request of the interested party for
          whatever legal purpose this may serve.
        </p>
        <div style={{ marginLeft: "auto" }}>
          <p
            style={{
              fontFamily: "Calibri",
              color: "black",
              fontSize: "14pt",
              fontWeight: "bold",
              textDecoration: "underline",
              marginTop: "10px",
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
            <td className="tds">Issued At</td>
            <td className="tds">Brgy. Butnga, Oras, E. Samar</td>
          </tr>
          <tr>
            <td className="tds">Amount Paid</td>
            <td className="tds">P50.00</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default BarangayClearance;
