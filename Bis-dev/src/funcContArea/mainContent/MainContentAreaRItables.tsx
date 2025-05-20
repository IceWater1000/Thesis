import React from "react";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import UpdateForm1 from "../functionsBar/addForms/UpdateForm1";
import "./tables.css";
import AddToLog from "../../Logging";
interface Resident {
  ResidentID: string;
  GivenName: string;
  LastName: string;
  MiddleName: string;
  Qualifier: string;
  Age: number;
  DateOfBirth: Date;
  Address: string;
  PlaceOfBirth: string;
  Sex: string;
  CivilStatus: string;
  OccupationID: string;
  Citizenship: string;
  status: string;
  NewBarangay: string;
}
interface ResidentFilter {
  address: string;
  sex: string;
  civilStatus: string;
  occupation: string;
  citizenship: string;
  status: string;
  ageRange1: string;
  ageRange2: string;
}
interface Props {
  type: string;
  filtervalue: object;
  searchvalue: string;
  addValue: boolean;
}
const MainContentAreaRItables = ({
  filtervalue,
  searchvalue,
  addValue,
  type,
}: Props) => {
  const [data, setData] = useState<Resident[]>([]);

  let [reload, setReload] = useState(false);
  let [apiLink, setApiLink] = useState(
    "http://localhost:5000/api/inhabitants/view"
  );
  const [filterParameters, setFilterParameters] = useState<ResidentFilter>({
    address: "",
    sex: "",
    civilStatus: "",
    occupation: "",
    citizenship: "",
    status: "alive",
    ageRange1: "",
    ageRange2: "",
  });

  const [searchParameter, setSearchParameter] = useState("");
  //Showing Delete Confirmation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  // calculating the age according to the birthday
  const calculateAge = (birthdate: Date) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  useEffect(() => {
    const fetchInhabitants = async () => {
      try {
        const response = await axios.get(apiLink);
        const updatedData = response.data.map((item: Resident) => {
          const Age = calculateAge(item.DateOfBirth); // Calculate age
          return { ...item, Age }; // Add the age property
        });
        setData(updatedData);
      } catch (err) {
        console.log("Error");
      }
    };

    fetchInhabitants();
  }, [apiLink, reload, addValue]);

  useEffect(() => {
    setFilterParameters(filtervalue as ResidentFilter);
  }, [filtervalue]);
  useEffect(() => {
    setSearchParameter(searchvalue);
  }, [searchvalue]);
  //Filtering Data
  const filteredData = data.filter((item) => {
    const matchesAdress =
      !filterParameters.address ||
      item.Address.toString().includes(filterParameters.address);
    const matchesSex =
      !filterParameters.sex ||
      item.Sex.toString().includes(filterParameters.sex);
    const matchesCivilStatus =
      !filterParameters.civilStatus ||
      item.CivilStatus.toString().includes(filterParameters.civilStatus);
    const matchesOccupation =
      !filterParameters.occupation ||
      item.OccupationID.toString().includes(filterParameters.occupation);
    const matchesCitizenship =
      !filterParameters.citizenship ||
      item.Citizenship.toString().includes(filterParameters.citizenship);
    const matchesStatus =
      !filterParameters.status ||
      item.status.toString().includes(filterParameters.status);
    const matchesAgeRange =
      (!filterParameters.ageRange1 ||
        item.Age >= parseInt(filterParameters.ageRange1)) &&
      (!filterParameters.ageRange2 ||
        item.Age <= parseInt(filterParameters.ageRange2));
    const matchesSearch =
      !searchParameter ||
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchParameter.toLowerCase());
    return (
      matchesAdress &&
      matchesCivilStatus &&
      matchesSex &&
      matchesOccupation &&
      matchesCitizenship &&
      matchesStatus &&
      matchesAgeRange &&
      matchesSearch
    );
  });
  //const filteredData = data.filter((item) =>
  //Object.values(item).some((val) =>
  //val?.toString().toLowerCase().includes("student")
  //)
  //);

  const onSortClickUP = (item: string) => {
    switch (item) {
      case "ResidentID":
        setApiLink("http://localhost:5000/api/inhabitants/views");
        break;
      case "GivenName":
        setApiLink("http://localhost:5000/api/inhabitants/views3");
        break;
      case "LastName":
        setApiLink("http://localhost:5000/api/inhabitants/views2");
        break;
      case "MiddleName":
        setApiLink("http://localhost:5000/api/inhabitants/views4");
        break;
      case "DateOfBirth":
        setApiLink("http://localhost:5000/api/inhabitants/views5");
        break;
    }

    console.log("sorted");
  };
  const onSortClick = (item: string) => {
    switch (item) {
      case "ResidentID":
        setApiLink("http://localhost:5000/api/inhabitants/view");
        break;
      case "GivenName":
        setApiLink("http://localhost:5000/api/inhabitants/view3");
        break;
      case "LastName":
        setApiLink("http://localhost:5000/api/inhabitants/view2");
        break;
      case "MiddleName":
        setApiLink("http://localhost:5000/api/inhabitants/view4");
        break;
      case "DateOfBirth":
        setApiLink("http://localhost:5000/api/inhabitants/view5");
        break;
    }

    console.log("sorted");
  };
  const hasSortButton = (item: string) => {
    if (
      item == "GivenName" ||
      item == "LastName" ||
      item == "MiddleName" ||
      item == "DateOfBirth" ||
      item == "ResidentID"
    ) {
      return (
        <>
          <div
            className="sortButton"
            key={`sort-button-down-${item}`}
            onClick={() => {
              onSortClick(item);
              setSortingOption(item);
              setSortingType("Ascending");
            }}
          >
            <img
              style={{ width: "10px", height: "10px" }}
              src="/Images/Black/caret-down.png"
            />
          </div>
          <div
            className="sortButton"
            key={`sort-button-up-${item}`}
            onClick={() => {
              onSortClickUP(item);
              setSortingOption(item);
              setSortingType("Descending");
            }}
          >
            <img
              style={{ width: "10px", height: "10px" }}
              src="/Images/Black/sort-up.png"
            />
          </div>
        </>
      );
    }
  };
  const [isUpdating, setIsUpdating] = useState(false);
  const [resID, setResID] = useState("0");
  const handleAddClick = () => {
    setIsUpdating(!isUpdating); // Toggle the off-canvas
    setApiLink("http://localhost:5000/api/inhabitants/view");
    setReload(!reload);
  };
  const onUpdate = (item: string) => {
    setResID(item);
  };
  const addToTransferred = async (item1: string, NewLocation: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/inhabitants/addToTransferred`,
        { ID: item1, NewLocation: NewLocation }
      );
      console.log("Data deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const onDelete = async (item: string) => {
    try {
      // Make a DELETE request to the backend with the item as a parameter
      const response = await axios.post(
        `http://localhost:5000/api/inhabitants/delete`,
        { ID: item, Status: reason, NewBarangay: newBarangay }
      );

      // Log or handle the successful deletion response
      console.log("Data deleted successfully:", response.data);
      setReload(!reload);
      AddToLog(`Data Deleted --Barangay Inhabitants-- ID:${item}`);
    } catch (error) {
      // Handle any errors that occur during the deletion
      console.error("Error deleting data:", error);
    } finally {
      if (reason === "transferred") {
        addToTransferred(item, newBarangay);
      }
    }
  };

  //for data displayed on top of the table
  const [sortingOption, setSortingOption] = useState("ResidentID");
  const [sortingType, setSortingType] = useState("Decending");
  const [totalCount, setTotalCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  //For displaying information in above the table
  useEffect(() => {
    setTotalCount(data.length);
  }, [data]);
  useEffect(() => {
    setCurrentCount(filteredData.length);
  }, [filteredData]);

  // for the delete modal
  const [reason, setReason] = useState("deceased");
  const [newBarangay, setNewBarangay] = useState("");

  const newBarangayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setNewBarangay(val);
  };
  return (
    <div>
      <div className="topContainerTableData">
        <div>
          <div className="topContainerTableDataText">
            Total Barangay Inhabitants:{" "}
            <span style={{ textDecoration: "underline" }}>{totalCount}</span>
          </div>
          <div className="topContainerTableDataText">
            Current Shown Data Count:{" "}
            <span style={{ textDecoration: "underline" }}>{currentCount}</span>
          </div>
        </div>
        <div>
          <div className="topContainerTableDataText">
            Current Sorting Option:{" "}
            <span style={{ textDecoration: "underline" }}>{sortingOption}</span>
          </div>
          <div className="topContainerTableDataText">
            Type:{" "}
            <span style={{ textDecoration: "underline" }}>{sortingType}</span>
          </div>
        </div>
        <div className="topContainerTableDataText">
          Filtering Option:{" "}
          <span style={{ textDecoration: "underline" }}>
            {totalCount == currentCount ? "None" : "Active"}
          </span>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key, index) =>
                index == 12 ? (
                  ""
                ) : key === "NewBarangay" ? (
                  ""
                ) : (
                  <>
                    <th className="thContent" key={`header-${key}-${index}`}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "5px",
                        }}
                      >
                        {key}
                        {hasSortButton(key)}
                      </div>
                    </th>
                  </>
                )
              )}
            {type !== "official" && (
              <>
                {filterParameters.status === "alive" && (
                  <th className="thContent">Action</th>
                )}
                {filterParameters.status === "deceased" && (
                  <th className="thContent">Action</th>
                )}
                {filterParameters.status === "transferred" && (
                  <>
                    <th className="thContent">New Barangay</th>
                    <th className="thContent">Action</th>
                  </>
                )}
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              <td>{item.ResidentID}</td>
              <td>{item.LastName}</td>
              <td>{item.GivenName}</td>
              <td>{item.MiddleName}</td>
              <td>{item.Qualifier}</td>
              <td>{item.DateOfBirth.toString()}</td>
              <td>{item.Address}</td>
              <td>{item.PlaceOfBirth}</td>
              <td>{item.Sex}</td>
              <td>{item.CivilStatus}</td>
              <td>{item.OccupationID}</td>
              <td>{item.Citizenship}</td>
              <td>{item.Age}</td>
              {type !== "official" && (
                <>
                  {filterParameters.status === "alive" ? (
                    <td>
                      <div className="actionColumn">
                        <div
                          className="update"
                          onClick={() => {
                            onUpdate(Object.values(item)[0]);
                            handleAddClick();
                          }}
                        >
                          Update
                        </div>
                        <div
                          className="delete"
                          onClick={() => {
                            setItemToDelete(Object.values(item)[0] as string); // Set the selected item
                            setIsModalOpen(true); // Open the modal
                          }}
                        >
                          Delete
                        </div>
                      </div>
                    </td>
                  ) : (
                    <>
                      {filterParameters.status === "deceased" && (
                        <td>
                          <div className="actionColumn">
                            <div
                              className="update"
                              onClick={() => {
                                onUpdate(Object.values(item)[0]);
                                handleAddClick();
                              }}
                            >
                              Update
                            </div>
                          </div>
                        </td>
                      )}
                      {filterParameters.status === "transferred" && (
                        <>
                          <td>{item.NewBarangay}</td>
                          <td>
                            <div className="actionColumn">
                              <div
                                className="update"
                                onClick={() => {
                                  onUpdate(Object.values(item)[0]);
                                  handleAddClick();
                                }}
                              >
                                Update
                              </div>
                            </div>
                          </td>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </tr>
          ))}
        </tbody>
        <div className={`modal ${isModalOpen ? "show" : ""}`}>
          <div className="modal-content2">
            <div className="modalMainText">Remove Barangay Resident??</div>

            <hr className="solidLine"></hr>
            <div className="modalText">
              Please specify the reason for removing this resident. This action
              cannot be undone.
            </div>
            <hr className="solidLine" style={{ marginBottom: "8px" }}></hr>
            <label className="radioButtonCont">
              <input
                className="radioButton"
                type="radio"
                value="deceased"
                checked={reason === "deceased"}
                onChange={() => setReason("deceased")}
              />
              <span className="radioButtonText">Deceased</span>
            </label>

            <label className="radioButtonCont">
              <input
                className="radioButton"
                type="radio"
                value="transferred"
                checked={reason === "transferred"}
                onChange={() => setReason("transferred")}
              />
              <span className="radioButtonText">
                Transferred to Another Barangay
              </span>
            </label>
            {reason === "transferred" ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className="modalText">New Barangay:</label>
                <input
                  style={{ height: "30px", fontSize: "17px" }}
                  type="text"
                  className="modalInput"
                  value={newBarangay}
                  onChange={newBarangayChange}
                />
              </div>
            ) : (
              ""
            )}

            <hr className="solidLine" style={{ marginTop: "8px" }}></hr>
            <div className="modalButtonContainer">
              <button
                onClick={() => {
                  onDelete(itemToDelete!); // Confirm deletion
                  setIsModalOpen(false);
                }}
              >
                Yes
              </button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </table>
      <div className={`offCanvas ${isUpdating ? "show" : ""}`}>
        <UpdateForm1 residentId={resID} onItemClick={handleAddClick} />
      </div>

      {isUpdating && <div className="backdrop"></div>}
    </div>
  );
};

export default MainContentAreaRItables;
