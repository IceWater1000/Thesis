import React, { useEffect, useState } from "react";
import "./forms.css";
import axios from "axios";
import Select, { SingleValue } from "react-select";
import AddToLog from "../../../Logging";
interface Props {
  onItemClick: () => void;
}
interface OptionType {
  value: string;
  label: string;
}
const AddForm1: React.FC<Props> = ({ onItemClick }: Props) => {
  const today = new Date().toISOString().split("T")[0];
  //for house forms
  const [assignToHouseActivity, setAssignToHouseActivity] = useState(false);
  const [houseOption, setHouseOption] = useState<OptionType[]>([]);
  const [citizenshipOpetion, setCitizenshipOption] = useState<OptionType[]>([]);
  //for showing KK or SC forms
  const [currentKKSC, setCurrentKKSC] = useState("None");
  const [formDataKK, setFormDataKK] = useState({
    Id: "",
    ContactNumber: "",
    EmailAddress: "",
    YouthClassification: "1",
    YouthAgeGroup: "1",
    HighestEducationalAttainmentID: "1",
    WorkStatus: "1",
  });
  const [formDataHH, setFormDataHH] = useState({
    Id: "",
    HouseholdNumber: "",
    RelationID: "1",
  });
  const [formDataSC, setFormDataSc] = useState({
    Id: "",
    SeniorCitizenNumber: "",
    ContactNumber: "",
    EmailAddress: "",
  });
  // State for form data
  const [formData, setFormData] = useState({
    lastName: "",
    givenName: "",
    middleName: "",
    qualifier: "",
    dateOfBirth: "",
    address: "1",
    placeOfBirth: "",
    sex: "male",
    civilStatus: "1",
    occupation: "",
    citizenship: "1",
  });
  // gather all citizenships
  useEffect(() => {
    const fetchCitizenship = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/inhabitants/citizen"
        );
        const transformResponse: OptionType[] = response.data.map(
          (citizen: any) => ({
            value: citizen.CitizenshipID,
            label: citizen.Name,
          })
        );

        setCitizenshipOption(transformResponse);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchCitizenship();
  }, [AddForm1]);

  //gather house numbers
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/household/householdtracking"
        );
        const transformResponse: OptionType[] = response.data.map(
          (houses: any) => ({
            value: houses.HouseholdNumber,
            label: houses.Name,
          })
        );
        setHouseOption(transformResponse);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchHouses();
  }, [AddForm1]);
  //adding to house if house are open
  useEffect(() => {
    if (formDataHH.Id !== "") {
      if (assignToHouseActivity) {
        const addHH = async () => {
          try {
            const response = await axios.post(
              "http://localhost:5000/api/inhabitants/addHH",
              formDataHH
            );
            console.log("Data added successfully:", response.data);
          } catch (err) {
            console.error("Error adding data:", err);
          }
        };
        addHH();
      }
    }
  }, [formDataHH]);
  //adding SC or KK if they are open
  useEffect(() => {
    if (formDataKK.Id !== "" || formDataSC.Id !== "") {
      switch (currentKKSC) {
        case "None":
          console.log("Not Adding");
          return;

        case "KK":
          const addKK = async () => {
            try {
              const response = await axios.post(
                "http://localhost:5000/api/inhabitants/addKK",
                formDataKK
              );
              console.log("Data added successfully:", response.data);
            } catch (error) {
              console.error("Error adding data:", error);
            }
          };
          addKK();
          return;
        case "SC":
          const addSC = async () => {
            try {
              const response = await axios.post(
                "http://localhost:5000/api/inhabitants/addSC",
                formDataSC
              );
              console.log("Data added successfully:", response.data);
            } catch (error) {
              console.error("Error adding data:", error);
            }
          };
          addSC();
          return;
      }
    }
  }, [formDataKK, formDataSC]);
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
  const handleChangeKK = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormDataKK({
      ...formDataKK,
      [name]: value,
    });
  };
  const handleChangeSC = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormDataSc({
      ...formDataSC,
      [name]: value,
    });
  };
  const handleChangeHH = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormDataHH({
      ...formDataHH,
      [name]: value,
    });
  };
  const handleReactSelectChange = (option: SingleValue<OptionType>) => {
    const value = option?.value || "";
    setFormData({
      ...formData,
      citizenship: value,
    });
  };
  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Pass the form data to another function
    submitFormData(formData);
    setFormData({
      lastName: "",
      givenName: "",
      middleName: "",
      qualifier: "",
      dateOfBirth: "",
      address: "1",
      placeOfBirth: "",
      sex: "male",
      civilStatus: "1",
      occupation: "",
      citizenship: "1",
    });
  };

  //function to handle submitted data
  const submitFormData = (data: typeof formData) => {
    console.log("Submitting form data to API:", data);
    const addData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/inhabitants/add",
          data
        );
        setFormDataKK((prevState) => ({
          ...prevState,
          Id: response.data.id,
        }));
        setFormDataSc((prevState) => ({
          ...prevState,
          Id: response.data.id,
        }));
        setFormDataHH((prevState) => ({
          ...prevState,
          Id: response.data.id,
        }));
        console.log("Data added successfully: ", response.data.id);
      } catch (error) {
        console.error("Error adding data:", error);
      } finally {
        AddToLog(`Data Added --Barangay Resident--`);
        alert("Data Added Successfully");
      }
    };

    addData();
    onItemClick();
  };
  //Below is code for opening KK or SC form

  const showKKorSC = () => {
    switch (currentKKSC) {
      case "None":
        return <></>;

      case "KK":
        return (
          <>
            <div className="addFormKKSCContainer" style={{ width: "400px" }}>
              <form className="forms1KK" onSubmit={() => {}}>
                <p
                  style={{
                    fontFamily: '"Roboto", sans-serif',
                    fontWeight: "bolder",
                    fontSize: "16px",
                    color: "#433BFF",
                    margin: "0",
                  }}
                >
                  KK Members Form
                </p>
                <div className="formContainer">
                  <label className="labels2">Contact #:</label>
                  <input
                    className="input2"
                    type="text"
                    id="ContactNumber"
                    name="ContactNumber"
                    value={formDataKK.ContactNumber}
                    onChange={handleChangeKK}
                    required
                  />
                </div>
                <div className="formContainer">
                  <label className="labels2">Email Address:</label>
                  <input
                    className="input2"
                    type="email"
                    id="EmailAddress"
                    name="EmailAddress"
                    value={formDataKK.EmailAddress}
                    onChange={handleChangeKK}
                    required
                  />
                </div>
                <div className="formContainer">
                  <label className="labels2">Youth Classification:</label>
                  <select
                    className="select2"
                    id="YouthClassification"
                    name="YouthClassification"
                    value={formDataKK.YouthClassification}
                    onChange={handleChangeKK}
                    required
                    defaultValue={1}
                  >
                    <option value="1">In School Youth</option>
                    <option value="2">Out of School Youth</option>
                    <option value="3">Working Youth</option>
                    <option value="4">Youth With Specific Needs</option>
                  </select>
                </div>
                <div className="formContainer">
                  <label className="labels2">Youth Age Group:</label>
                  <select
                    className="select2"
                    id="YouthAgeGroup"
                    name="YouthAgeGroup"
                    value={formDataKK.YouthAgeGroup}
                    onChange={handleChangeKK}
                    required
                    defaultValue={1}
                  >
                    <option value="1">Child Youth (15-17 yrs old)</option>
                    <option value="2">Core Youth (18-24 yrs old)</option>
                    <option value="3">Young Adult (15-30 yrs old)</option>
                  </select>
                </div>
                <div className="formContainer">
                  <label className="labels2">
                    Highest Educational Attainment
                  </label>
                  <select
                    className="select2"
                    id="HighestEducationalAttainmentID"
                    name="HighestEducationalAttainmentID"
                    value={formDataKK.HighestEducationalAttainmentID}
                    onChange={handleChangeKK}
                    required
                    defaultValue={1}
                  >
                    <option value="1">Elementary Level</option>
                    <option value="2">Elementary Grad</option>
                    <option value="3">High School Level</option>
                    <option value="4">High School Grad</option>
                    <option value="5">Vocational Grad</option>
                    <option value="6">College Level</option>
                    <option value="7">College Grad</option>
                    <option value="8">Masters Level</option>
                    <option value="9">Masters Grad</option>
                    <option value="10">Doctorate Level</option>
                    <option value="11">Doctorate Graduate</option>
                  </select>
                </div>
                <div className="formContainer">
                  <label className="labels2">Work Status</label>
                  <select
                    className="select2"
                    id="WorkStatus"
                    name="WorkStatus"
                    value={formDataKK.WorkStatus}
                    onChange={handleChangeKK}
                    required
                    defaultValue={1}
                  >
                    <option value="1">Employed</option>
                    <option value="2">Unemployed</option>
                    <option value="3">Self-Employed</option>
                    <option value="4">Currently looking for a Job</option>
                    <option value="5">Not Interested Looking for a Job</option>
                  </select>
                </div>
              </form>
            </div>
          </>
        );

      case "SC":
        return (
          <>
            <div className="addFormKKSCContainer" style={{ width: "400px" }}>
              <form className="forms1KK" onSubmit={() => {}}>
                <p
                  style={{
                    fontFamily: '"Roboto", sans-serif',
                    fontWeight: "bolder",
                    fontSize: "16px",
                    color: "#433BFF",
                    margin: "0",
                  }}
                >
                  Senior Citizen Form
                </p>
                <div className="formContainer">
                  <label className="labels2">Senior Citizen Number:</label>
                  <input
                    className="input2"
                    type="text"
                    id="SeniorCitizenNumber"
                    name="SeniorCitizenNumber"
                    value={formDataSC.SeniorCitizenNumber}
                    onChange={handleChangeSC}
                    required
                  />
                </div>
                <div className="formContainer">
                  <label className="labels2">Contact #:</label>
                  <input
                    className="input2"
                    type="text"
                    id="ContactNumber"
                    name="ContactNumber"
                    value={formDataSC.ContactNumber}
                    onChange={handleChangeSC}
                    required
                  />
                </div>
                <div className="formContainer">
                  <label className="labels2">Email Address:</label>
                  <input
                    className="input2"
                    type="email"
                    id="EmailAddress"
                    name="EmailAddress"
                    value={formDataSC.EmailAddress}
                    onChange={handleChangeSC}
                    required
                  />
                </div>
              </form>
            </div>
          </>
        );
    }
  };
  const KKSC = (item: string) => {
    setCurrentKKSC(item);
    if (item == currentKKSC) {
      //reset value of KK form if it is closed
      if (item == "KK") {
        setFormDataKK({
          Id: "",
          ContactNumber: "",
          EmailAddress: "",
          YouthClassification: "1",
          YouthAgeGroup: "1",
          HighestEducationalAttainmentID: "1",
          WorkStatus: "1",
        });
      } else {
        //reset value of SC form if it is closed
        setFormDataSc({
          Id: "",
          SeniorCitizenNumber: "",
          ContactNumber: "",
          EmailAddress: "",
        });
      }
      setCurrentKKSC("None");
    }
  };
  const assignToHouse = () => {
    setAssignToHouseActivity(!assignToHouseActivity);
    setFormDataHH({
      Id: "",
      HouseholdNumber: "",
      RelationID: "1",
    });
  };
  const handleReactSelectChange2 = (option: SingleValue<OptionType>) => {
    const value = option?.value || "";
    setFormDataHH({
      ...formDataHH,
      HouseholdNumber: value,
    });
  };
  const showAssignToHouse = () => {
    if (assignToHouseActivity == true) {
      return (
        <>
          <div className="addFormKKSCContainer" style={{ width: "400px" }}>
            <form className="forms1KK" onSubmit={() => {}}>
              <p
                style={{
                  fontFamily: '"Roboto", sans-serif',
                  fontWeight: "bolder",
                  fontSize: "16px",
                  color: "#433BFF",
                  margin: "0",
                }}
              >
                Assign To Household
              </p>
              <div className="formContainer">
                <label className="labels2">HouseholdNumber:</label>
                <Select
                  options={houseOption}
                  name="HouseholdNumber"
                  id="HouseholdNumbe"
                  onChange={handleReactSelectChange2}
                  className="select2"
                  required
                  //isMulti={false} // Set to true for multi-select
                />
              </div>
              <div className="formContainer">
                <label className="labels2">Relation to Household Head</label>
                <select
                  className="select2"
                  id="RelationID"
                  name="RelationID"
                  value={formDataHH.RelationID}
                  onChange={handleChangeHH}
                  required
                  defaultValue={1}
                >
                  <option value="1">Father</option>
                  <option value="2">Mother</option>
                  <option value="3">Son</option>
                  <option value="4">Daughter</option>
                  <option value="5">Aunt</option>
                  <option value="6">Uncle</option>
                  <option value="7">Grandparent</option>
                  <option value="8">Grandson/Granddaughter</option>
                  <option value="9">Cousin</option>
                  <option value="10">Neice/Nephew</option>
                  <option value="11">Friend</option>
                  <option value="12">Spouse</option>
                  <option value="13">Brother</option>
                  <option value="14">Sister</option>
                </select>
              </div>
            </form>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };
  return (
    <>
      <div className="container">
        <div className="SideContainer">
          <div className="asdef">
            <div className="barangayLogoContainer">
              <img
                style={{ width: "57px", height: "57px" }}
                src="/Images/asd2.png"
              />
            </div>
            <div className="logoLabels">
              <p className="heading2">Barangay</p>
              <p className="heading2" style={{ marginTop: "-12px" }}>
                Butnga
              </p>
              <p className="heading3">Oras Eastern Samar</p>
            </div>
          </div>
        </div>
        <form className="forms" onSubmit={handleSubmit}>
          <p
            style={{
              fontFamily: '"Roboto", sans-serif',
              fontWeight: "bolder",
              fontSize: "24px",
              color: "#433BFF",
              margin: "0",
            }}
          >
            RESIDENT INFORMATION FORM
          </p>
          <div className="formContainer">
            <label className="labels">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formContainer">
            <label className="labels">Given Name:</label>
            <input
              type="text"
              id="givenName"
              name="givenName"
              value={formData.givenName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formContainer">
            <label className="labels">Middle Name:</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>

          <div className="formContainer">
            <label className="labels">Qualifier:</label>
            <input
              type="text"
              id="qualifier"
              name="qualifier"
              value={formData.qualifier}
              onChange={handleChange}
            />
          </div>

          <div className="formContainer">
            <label className="labels">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              max={today}
            />
          </div>

          <div className="formContainer">
            <label className="labels">Address:</label>
            <select
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              defaultValue={1}
            >
              <option value="1">Zone 1</option>
              <option value="2">Zone 2</option>
              <option value="3">Zone 3</option>
              <option value="4">Zone 4</option>
            </select>
          </div>

          <div className="formContainer">
            <label className="labels">Place of Birth:</label>
            <input
              type="text"
              id="placeOfBirth"
              name="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formContainer">
            <label className="labels">Sex:</label>
            <select
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="formContainer">
            <label className="labels">Civil Status:</label>

            <select
              id="civilStatus"
              name="civilStatus"
              value={formData.civilStatus}
              onChange={handleChange}
              required
            >
              <option value="1">Single</option>
              <option value="2">Married</option>
              <option value="4">Separated</option>
              <option value="5">Widowed</option>
            </select>
          </div>

          <div className="formContainer">
            <label className="labels">Occupation:</label>
            <input
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </div>

          <div className="formContainer">
            <label className="labels">Citizenship:</label>
            <Select
              options={citizenshipOpetion}
              name="ResidentID"
              id="ResidentID"
              onChange={handleReactSelectChange}
              className="reactSelect"

              //isMulti={false} // Set to true for multi-select
            />
          </div>
          <div className="formContainer" style={{ marginTop: "10px" }}>
            <div
              className={
                currentKKSC == "KK" ? "button2 small active" : "button2 small"
              }
              onClick={() => {
                KKSC("KK");
              }}
            >
              Is KK Member
            </div>
            <div
              className={
                currentKKSC == "SC" ? "button2 small active" : "button2 small"
              }
              onClick={() => {
                KKSC("SC");
              }}
            >
              Is Senior Citizen
            </div>
            <div
              className={
                assignToHouseActivity ? "button2 small active" : "button2 small"
              }
              onClick={() => {
                assignToHouse();
              }}
            >
              Assign To Household
            </div>
          </div>
          <div className="formContainer" style={{ marginTop: "10px" }}>
            <button className="buttons" type="submit">
              Submit
            </button>
            <button
              className="buttons"
              type="button"
              onClick={() => {
                onItemClick();
                if (currentKKSC == "KK") {
                  KKSC("KK");
                } else if (currentKKSC == "SC") {
                  KKSC("SC");
                }
                assignToHouse();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="additionalAddFormContainer">
        <div style={{ flex: "1" }}></div>
        <div className="KKSC">{showKKorSC()}</div>
        <div style={{ flex: "1" }}>{showAssignToHouse()}</div>
      </div>
    </>
  );
};

export default AddForm1;
