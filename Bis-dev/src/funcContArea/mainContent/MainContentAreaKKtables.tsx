import React from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import UpdateForm5 from "../functionsBar/addForms/UpdateForm5";
import "./tables.css";
interface KK {
  ContactNumber: string;
  EmailAddress: string;
  FullName: string;
  HighestEducationalAttainment: string;
  KKMemberID: string;
  WorkStatus: string;
  YouthAgeGroup: string;
  YouthClassification: string;
  DateOfBirth: Date;
}
interface KKFilter {
  youthClassification: string;
  youthAgeGroup: string;
  highestEducationalAttainment: string;
  workStatus: string;
}

interface Props {
  type: string;
  addValue: boolean;
  filtervalue: object;
  searchvalue: string;
}
const MainContentAreaKKtables = ({
  filtervalue,
  searchvalue,
  addValue,
  type,
}: Props) => {
  const [data, setData] = useState<KK[]>([]);
  const [filterParameters, setFilterParameters] = useState<KKFilter>({
    youthClassification: "",
    youthAgeGroup: "",
    highestEducationalAttainment: "",
    workStatus: "",
  });
  const [searchParameter, setSearchParameter] = useState("");
  let [reload, setReload] = useState(false);
  //for Viewing
  useEffect(() => {
    const fetchInhabitants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/KKMembers/view"
        );
        const updatedData = response.data.map((item: KK) => {
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
    setFilterParameters(filtervalue as KKFilter);
  }, [filtervalue]);
  useEffect(() => {
    setSearchParameter(searchvalue);
  }, [searchvalue]);

  const filterData = data.filter((item) => {
    const matchesYouthClassification =
      !filterParameters.youthClassification ||
      item.YouthClassification.toString().includes(
        filterParameters.youthClassification
      );
    const matchesYouthAgeGroup =
      !filterParameters.youthAgeGroup ||
      item.YouthAgeGroup.toString().includes(filterParameters.youthAgeGroup);
    const matchesHighestEducationalAttainment =
      !filterParameters.highestEducationalAttainment ||
      item.HighestEducationalAttainment.toString().includes(
        filterParameters.highestEducationalAttainment
      );
    const matchesWorkStatus =
      !filterParameters.workStatus ||
      item.WorkStatus.toString().includes(filterParameters.workStatus);
    const matchesSearch =
      !searchParameter ||
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchParameter.toLowerCase());
    return (
      matchesHighestEducationalAttainment &&
      matchesSearch &&
      matchesWorkStatus &&
      matchesYouthAgeGroup &&
      matchesYouthClassification
    );
  });
  const hasSortButton = (item: string) => {
    if (item == "KKMemberID") {
      return (
        <>
          <div
            className="sortButton"
            key={item}
            onClick={() => {
              //onSortClick(item);
            }}
          >
            <img
              style={{ width: "10px", height: "10px" }}
              src="/Images/Black/caret-down.png"
            ></img>
          </div>
          <div
            className="sortButton"
            key={item}
            onClick={() => {
              //onSortClickUP(item);
            }}
          >
            <img
              style={{ width: "10px", height: "10px" }}
              src="/Images/Black/sort-up.png"
            ></img>
          </div>
        </>
      );
    }
  };
  // delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  //delete fetch
  const onDelete = async (item: string) => {
    try {
      // Make a DELETE request to the backend with the item as a parameter
      const response = await axios.delete(
        `http://localhost:5000/api/KKMembers/delete/${item}`
      );

      // Log or handle the successful deletion response
      console.log("Data deleted successfully:", response.data);
      setReload(!reload);
    } catch (error) {
      // Handle any errors that occur during the deletion
      console.error("Error deleting data:", error);
    }
  };
  //update
  const [isUpdating, setIsUpdating] = useState(false);
  const [resID, setResID] = useState("0");

  const handleAddClick = () => {
    setIsUpdating(!isUpdating); // Toggle the off-canvas
    setReload(!reload);
  };
  const onUpdate = (item: string) => {
    setResID(item);
  };
  //For displaying information in above the table
  const [sortingOption, setSortingOption] = useState("ResidentID");
  const [sortingType, setSortingType] = useState("Decending");
  const [totalCount, setTotalCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    setTotalCount(data.length);
  }, [data]);
  useEffect(() => {
    setCurrentCount(filterData.length);
  }, [filterData]);

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
  return (
    <div>
      <div className="topContainerTableData">
        <div>
          <div className="topContainerTableDataText">
            Total KK Members:{" "}
            <span style={{ textDecoration: "underline" }}>{totalCount}</span>
          </div>
          <div className="topContainerTableDataText">
            Current Shown Data Count:{" "}
            <span style={{ textDecoration: "underline" }}>{currentCount}</span>
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
              Object.keys(data[0]).map((key) => (
                <th className="thContent" key={key}>
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
              ))}
            {type == "official" ? "" : <th className="thContent">Action</th>}
          </tr>
        </thead>
        <tbody>
          {filterData.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((val, i) => (
                <td key={i}>{val}</td>
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
        <UpdateForm5 residentId={resID} onItemClick={handleAddClick} />
      </div>

      {isUpdating && <div className="backdrop"></div>}
    </div>
  );
};

export default MainContentAreaKKtables;
