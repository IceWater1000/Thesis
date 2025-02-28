import React, { useState } from "react";
import "./external.css";
import Login from "../Login";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext";

const Footer = () => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const handleLoginClick = () => {
    setOpenLoginForm(!openLoginForm);
  };
  const { currentActiveFromButtons, setCurrentActiveFromButtons } = useData();
  const navigate = useNavigate();
  const doSiteLinks = (link: string, item: string) => {
    navigate(link);
    setCurrentActiveFromButtons(item);
    window.scrollTo(0, 0);
  };

  return (
    <div className="footer">
      <div className="Col">
        <div className="footerTitle">SERVICES OFFERED</div>
        <ul>
          <li className="footerText">Barangay Clearance Issuance</li>
          <li className="footerText">Business Permits Issuance</li>
          <li className="footerText">Certificate of Indigency Issuance</li>
          <li className="footerText">Certificate of Good Moral Character</li>
          <li className="footerText">Barangay Day Care School</li>
          <li className="footerText">Barangay Certification</li>
        </ul>
      </div>
      <div className="Col">
        <div className="footerTitle">CONTACT INFORMATION</div>
        <div className="footerSemiTitle">TELEPHONE NUMBERS:</div>
        <ul>
          <li className="footerText">+639873266574 </li>
          <li className="footerText">+639878267543</li>
          <li className="footerText">+639768533212</li>
        </ul>
        <div className="footerSemiTitle">TANOD HOTLINE:</div>
        <ul>
          <li className="footerText">+639887098786</li>
        </ul>
        <div className="footerSemiTitle">EMAIL ADDRESS:</div>
        <ul>
          <li className="footerText">barangay_butnga_OrasES.gmail.com</li>
        </ul>
      </div>
      <div className="Col">
        <div className="footerTitle">SITE LINKS</div>
        <ul>
          <li
            className="footerText"
            onClick={() => {
              doSiteLinks("/Home", "HOME");
            }}
          >
            Home
          </li>
          <li
            className="footerText"
            onClick={() => {
              doSiteLinks("/DemographicProfile", "DEMOGRAPHIC PROFILE");
            }}
          >
            Demographic Profile
          </li>
          <li
            className="footerText"
            onClick={() => {
              doSiteLinks("/BarangayPersonel", "BARANGAY PERSONEL");
            }}
          >
            Barangay Personnel
          </li>
          <li
            className="footerText"
            onClick={() => {
              doSiteLinks("/Announcements", "ANNOUNCEMENTS");
            }}
          >
            Announcements
          </li>
          <li
            className="footerText"
            onClick={() => {
              doSiteLinks("/Projects", "PROJECTS");
            }}
          >
            Projects
          </li>
          <li
            className="footerText"
            onClick={() => {
              doSiteLinks("/Ordinances", "ORDINANCES");
            }}
          >
            Ordinances
          </li>
          <li className="footerText" onClick={handleLoginClick}>
            Log in
          </li>
        </ul>
      </div>
      <div className={`LoginFormCanvas ${openLoginForm ? "show" : ""}`}>
        <Login
          isLogsIn={() => {}}
          onItemClick={handleLoginClick}
          isVisible={openLoginForm}
        />
      </div>
      {openLoginForm && <div className="backdrops"></div>}
    </div>
  );
};

export default Footer;
