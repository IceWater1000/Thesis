import React from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import UpdateForm4 from "../functionsBar/addForms/UpdateForm4";
interface Senior {
  Address: string;
  Citizenship: string;
  CivilStatus: string;
  ContactNumber: string;
  Email: string;
  FullName: string;
  OccupationID: string;
  SeniorCitizenID: string;
  SeniorCitizenNumber: string;
}
interface SeniorFilter {
  address: string;
  civilStatus: string;
  occupation: string;
  citizenship: string;
}
interface Props {
  type: string;
  addValue: boolean;
  filtervalue: object;
  searchvalue: string;
}
import "./tables.css";
const MainContentAreaSCtables = ({
  filtervalue,
  searchvalue,
  addValue,
  type,
}: Props) => {
  const [data, setData] = useState<Senior[]>([]);
  const [filterParameters, setFilterParameters] = useState<SeniorFilter>({
    address: "",
    civilStatus: "",
    occupation: "",
    citizenship: "",
  });
  const [searchParameter, setSearchParameter] = useState("");
  let [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchInhabitants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/seniorCitizen/view"
        );
        setData(response.data);
      } catch (err) {
        console.log("Error");
      }
    };

    fetchInhabitants();
  }, [reload, addValue]);
  useEffect(() => {
    setFilterParameters(filtervalue as SeniorFilter);
  }, [filtervalue]);
  useEffect(() => {
    setSearchParameter(searchvalue);
  }, [searchvalue]);
  // delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  //delete fetch
  const onDelete = async (item: string) => {
    try {
      // Make a DELETE request to the backend with the item as a parameter
      const response = await axios.delete(
        `http://localhost:5000/api/seniorCitizen/delete/${item}`
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
  //for data filter
  const filterData = data.filter((item) => {
    const matchAddress =
      !filterParameters.address ||
      item.Address.toString().includes(filterParameters.address);
    const matchCivilStatus =
      !filterParameters.civilStatus ||
      item.CivilStatus.toString().includes(filterParameters.civilStatus);
    const Occupation =
      !filterParameters.occupation ||
      item.OccupationID.toString().includes(filterParameters.occupation);
    const Citizenship =
      !filterParameters.citizenship ||
      item.Citizenship.toString().includes(filterParameters.citizenship);
    const matchesSearch =
      !searchParameter ||
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchParameter.toLowerCase());
    return (
      matchAddress &&
      matchCivilStatus &&
      Occupation &&
      Citizenship &&
      matchesSearch
    );
  });
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
  return (
    <div>
      <div className="topContainerTableData">
        <div>
          <div className="topContainerTableDataText">
            Total Senior Citizen Members:{" "}
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
          {data.length > 0 &&
            Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          {type == "official" ? "" : <th className="thContent">Action</th>}
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
        <UpdateForm4 residentId={resID} onItemClick={handleAddClick} />
      </div>

      {isUpdating && <div className="backdrop"></div>}
    </div>
  );
};

export default MainContentAreaSCtables;
