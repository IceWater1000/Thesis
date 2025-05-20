import React from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import UpdateForm3 from "../functionsBar/addForms/UpdateForm3";
import "./tables.css";
import AddToLog from "../../Logging";
interface HouseholdMember {
  HouseholdMembershipID: string;
  CivilStatus: string;
  OccupationID: string;
  Citizenship: string;
  Fullname: string;
  Sex: string;
  RelationToHead: string;
  DateOfBirth: Date;
  HouseholdNumber: number;
  Age: number;
}
interface HouseholdMemberFilter {
  householdNumber: string;
  sex: string;
  civilStatus: string;
  occupation: string;
  citizenship: string;
  ageRange1: string;
  ageRange2: string;
}
interface Props {
  type: string;
  addValue: boolean;
  filtervalue: object;
  searchvalue: string;
}
const MainContentAreaHMtables = ({
  filtervalue,
  searchvalue,
  addValue,
  type,
}: Props) => {
  let [reload, setReload] = useState(false);
  const [data, setData] = useState<HouseholdMember[]>([]);
  const [filterParameters, setFilterParameters] =
    useState<HouseholdMemberFilter>({
      householdNumber: "",
      sex: "",
      civilStatus: "",
      occupation: "",
      citizenship: "",
      ageRange1: "",
      ageRange2: "",
    });
  const [searchParameter, setSearchParameter] = useState("");
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
        const response = await axios.get(
          "http://localhost:5000/api/householdMembers/view"
        );

        const updatedData = response.data.map((item: HouseholdMember) => {
          const Age = calculateAge(item.DateOfBirth); // Calculate age
          return { ...item, Age }; // Add the age property
        });
        setData(updatedData);
      } catch (err) {
        console.log("Error");
      }
    };

    fetchInhabitants();
  }, [reload, addValue]);
  useEffect(() => {
    setFilterParameters(filtervalue as HouseholdMemberFilter);
  }, [filtervalue]);
  useEffect(() => {
    setSearchParameter(searchvalue);
  }, [searchvalue]);
  const filteredData = data.filter((item) => {
    const matchesHouse =
      !filterParameters.householdNumber ||
      item.HouseholdNumber.toString() === filterParameters.householdNumber;
    const matchSex =
      !filterParameters.sex ||
      item.Sex.toString().includes(filterParameters.sex);
    const matchCivilStatus =
      !filterParameters.civilStatus ||
      item.CivilStatus.toString().includes(filterParameters.civilStatus);
    const Occupation =
      !filterParameters.occupation ||
      item.OccupationID.toString().includes(filterParameters.occupation);
    const Citizenship =
      !filterParameters.citizenship ||
      item.Citizenship.toString().includes(filterParameters.citizenship);
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
    console.log(matchesSearch);
    return (
      matchesHouse &&
      matchSex &&
      matchCivilStatus &&
      matchesSearch &&
      Occupation &&
      Citizenship &&
      matchesAgeRange
    );
  });

  let [apiLink, setApiLink] = useState(
    "http://localhost:5000/api/inhabitants/view"
  );
  //for Opening delete Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  //delete fetch
  const onDelete = async (item: string) => {
    try {
      // Make a DELETE request to the backend with the item as a parameter
      const response = await axios.delete(
        `http://localhost:5000/api/householdMembers/delete/${item}`
      );

      // Log or handle the successful deletion response
      console.log("Data deleted successfully:", response.data);
      AddToLog(`Data Deleted --Household Members-- ID:${item}`);
      setReload(!reload);
    } catch (error) {
      // Handle any errors that occur during the deletion
      console.error("Error deleting data:", error);
    }
  };
  //for updating
  const [isUpdating, setIsUpdating] = useState(false);
  const [resID, setResID] = useState("0");

  const handleAddClick = () => {
    setIsUpdating(!isUpdating); // Toggle the off-canvas
    setReload(!reload);
  };
  const onUpdate = (item: string) => {
    setResID(item);
  };
  //for displaying data above the table
  const [totalCount, setTotalCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
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
            Total Household Inhabitants:{" "}
            <span style={{ textDecoration: "underline" }}>{totalCount}</span>
          </div>
          <div className="topContainerTableDataText">
            Current Shown Data Count:{" "}
            <span style={{ textDecoration: "underline" }}>{currentCount}</span>
          </div>
        </div>
        <div>
          <div className="topContainerTableDataText">
            Filtering Option:{" "}
            <span style={{ textDecoration: "underline" }}>
              {totalCount == currentCount ? "None" : "Active"}
            </span>
          </div>
          <div className="topContainerTableDataText">
            HouseholdNumber:
            <span style={{ textDecoration: "underline" }}>
              {filterParameters.householdNumber
                ? filterParameters.householdNumber
                : "ALL"}
            </span>
          </div>
        </div>
      </div>
      <table>
        <thead>
          {data.length > 0 &&
            Object.keys(data[0]).map((key) => (
              <th
                key={key}
                className={key == "HouseholdMembershipID" ? "disappear" : ""}
              >
                {key}
              </th>
            ))}
          {type == "official" ? "" : <th className="thContent">Action</th>}
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((val, i) => (
                <td key={i} className={i == 0 ? "disappear" : ""}>
                  {val}
                </td>
              ))}
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
        <UpdateForm3 residentId={resID} onItemClick={handleAddClick} />
      </div>

      {isUpdating && <div className="backdrop"></div>}
    </div>
  );
};

export default MainContentAreaHMtables;
