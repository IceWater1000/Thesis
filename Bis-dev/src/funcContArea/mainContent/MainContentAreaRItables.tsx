import React from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import UpdateForm1 from "../functionsBar/addForms/UpdateForm1";
import "./tables.css";
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
    console.log(filtervalue);
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
  const onDelete = async (item: string) => {
    try {
      // Make a DELETE request to the backend with the item as a parameter
      const response = await axios.delete(
        `http://localhost:5000/api/inhabitants/delete/${item}`
      );

      // Log or handle the successful deletion response
      console.log("Data deleted successfully:", response.data);
      setReload(!reload);
    } catch (error) {
      // Handle any errors that occur during the deletion
      console.error("Error deleting data:", error);
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
            {type == "official" ? "" : <th className="thContent">Action</th>}
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {Object.values(item).map((val, colIndex) =>
                colIndex == 12 ? (
                  ""
                ) : (
                  <>
                    <td key={`row-${rowIndex}-col-${colIndex}`}>{val}</td>
                  </>
                )
              )}
              {type == "official" ? (
                ""
              ) : (
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
              )}
            </tr>
          ))}
        </tbody>
        <div className={`modal ${isModalOpen ? "show" : ""}`}>
          <div className="modal-content">
            <div className="modalMainText">Delete Data?</div>

            <hr className="solidLine"></hr>
            <div className="modalText">This can't be undone</div>
            <hr className="solidLine"></hr>
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
