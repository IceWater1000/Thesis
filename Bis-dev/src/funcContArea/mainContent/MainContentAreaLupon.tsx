import React from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import UpdateForm6 from "../functionsBar/addForms/UpdateForm6";
import "./tables.css";
import AddToLog from "../../Logging";
interface Lupon {
  Id: string;
  NameOfComplainant: string;
  NameOfComplaint: string;
  NameOfRespondents: string;
  ComplainDetails: string;
  CaseNo: string;
  DateWritten: string;
  IsResolve: string;
}
interface Props {
  addValue: boolean;
  searchValue: string;
}
const MainContentAreaLupon = ({ addValue, searchValue }: Props) => {
  const [data, setData] = useState<Lupon[]>([]);
  const [searchParameter, setSearchParameter] = useState("");
  //Showing Delete Confirmation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  let [apiLink, setApiLink] = useState(
    "http://localhost:5000/api/inhabitants/view"
  );
  let [reload, setReload] = useState(false);
  //gather Data for Display
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/lupon/view"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, [addValue, reload]);
  const onSortClickUP = (item: string) => {
    switch (item) {
      case "ResidentID":
        setApiLink("http://localhost:5000/api/inhabitants/views");
        break;
      case "GivenName":
        setApiLink("http://localhost:5000/api/inhabitants/views2");
        break;
      case "LastName":
        setApiLink("http://localhost:5000/api/inhabitants/views3");
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
        setApiLink("http://localhost:5000/api/inhabitants/view2");
        break;
      case "LastName":
        setApiLink("http://localhost:5000/api/inhabitants/view3");
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

    setReload(!reload);
  };
  const onUpdate = (item: string) => {
    setResID(item);
  };
  const onDelete = async (item: string) => {
    try {
      // Make a DELETE request to the backend with the item as a parameter
      const response = await axios.delete(
        `http://localhost:5000/api/lupon/delete/${item}`
      );

      // Log or handle the successful deletion response
      console.log("Data deleted successfully:", response.data);
      AddToLog(`Data Deleted --Lupon Record-- ID:${item}`);
      setReload(!reload);
    } catch (error) {
      // Handle any errors that occur during the deletion
      console.error("Error deleting data:", error);
    }
  };
  useEffect(() => {
    setSearchParameter(searchValue);
  }, [searchValue]);
  const filteredData = data.filter((item) => {
    const matchesSearch =
      !searchParameter ||
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchParameter.toLowerCase());
    return matchesSearch;
  });
  //for data above the table
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
    <>
      <div>
        <div className="topContainerTableData">
          <div className="topContainerTableDataText">
            Total Number of Lupon Records:{" "}
            <span style={{ textDecoration: "underline" }}>{totalCount}</span>
          </div>
          <div className="topContainerTableDataText">
            Current Shown Data Count:{" "}
            <span style={{ textDecoration: "underline" }}>{currentCount}</span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key, index) => (
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
                ))}
              <th className="thContent">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {Object.values(item).map((val, colIndex) => (
                  <td
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      wordBreak: "break-all",
                      maxWidth: "200px",
                    }}
                    key={`row-${rowIndex}-col-${colIndex}`}
                  >
                    {val}
                  </td>
                ))}
                <td style={{ maxWidth: "90px" }}>
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
                        console.log(Object.values(item)[0]);
                        setItemToDelete(Object.values(item)[0] as string); // Set the selected item
                        setIsModalOpen(true); // Open the modal
                      }}
                    >
                      Delete
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <div className={`modal ${isModalOpen ? "show" : ""}`}>
            <div className="modal-content">
              <p>Are you sure you want to delete this item?</p>
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
        </table>
        <div className={`offCanvas3 ${isUpdating ? "show3" : ""}`}>
          {<UpdateForm6 theID={resID} onItemClick={handleAddClick} />}
        </div>

        {isUpdating && <div className="backdrop"></div>}
      </div>
    </>
  );
};

export default MainContentAreaLupon;
