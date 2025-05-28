import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AddForm1 from "../functionsBar/addForms/UpdateForm2";
import "./tables.css";
import AddToLog from "../../Logging";
interface House {
  HouseholdNumber: string;
  Address: string;
  TotalInhabitants: number;
  HouseholdHead: string;
}
interface HouseFilter {
  address: string;
  totalInhabitants1: string;
  totalInhabitants2: string;
}
interface Props {
  filtervalue: object;
  searchvalue: string;
  addValue: boolean;
  type: string;
}
const MainContentAreaHtables = ({
  filtervalue,
  searchvalue,
  addValue,
  type,
}: Props) => {
  const [data, setData] = useState<House[]>([]);
  let [reload, setReload] = useState(false);
  let [apiLink, setApiLink] = useState(
    "http://localhost:5000/api/household/view"
  );
  const [filterParameters, setFilterParameters] = useState<HouseFilter>({
    address: "",
    totalInhabitants1: "",
    totalInhabitants2: "",
  });
  const [searchParameter, setSearchParameter] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchInhabitants = async () => {
      try {
        const response = await axios.get(apiLink);
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Error");
      }
    };

    fetchInhabitants();
  }, [apiLink, reload, addValue]);
  useEffect(() => {
    setFilterParameters(filtervalue as HouseFilter);
  }, [filtervalue]);
  useEffect(() => {
    setSearchParameter(searchvalue);
  }, [searchvalue]);
  const filteredData = data.filter((item) => {
    const matchesAddress =
      !filterParameters.address ||
      item.Address.toString().includes(filterParameters.address);
    const matchesTotalInhabitantsRange =
      (!filterParameters.totalInhabitants1 ||
        item.TotalInhabitants >=
          parseInt(filterParameters.totalInhabitants1)) &&
      (!filterParameters.totalInhabitants2 ||
        item.TotalInhabitants <= parseInt(filterParameters.totalInhabitants2));

    const matchesSearch =
      !searchParameter ||
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchParameter.toLowerCase());
    return matchesAddress && matchesTotalInhabitantsRange && matchesSearch;
  });
  const onSortClickUP = (item: string) => {
    switch (item) {
      case "HouseholdNumber":
        setApiLink("http://localhost:5000/api/household/view2");
        break;
      case "TotalInhabitants":
        setApiLink("http://localhost:5000/api/household/views");
        console.log("asasdasd");
        break;
    }

    console.log("sorted");
  };
  const onSortClick = (item: string) => {
    switch (item) {
      case "HouseholdNumber":
        setApiLink("http://localhost:5000/api/household/view");
        break;
      case "TotalInhabitants":
        setApiLink("http://localhost:5000/api/household/views2");
        break;
    }
  };
  const hasSortButton = (item: string) => {
    if (item == "HouseholdNumber" || item == "TotalInhabitants") {
      return (
        <>
          <div
            className="sortButton"
            key={item}
            onClick={() => {
              onSortClick(item);
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
              onSortClickUP(item);
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
  const [isUpdating, setIsUpdating] = useState(false);
  const [resID, setResID] = useState("0");
  const handleAddClick = () => {
    setIsUpdating(!isUpdating); // Toggle the off-canvas
    setApiLink("http://localhost:5000/api/household/view");
    setReload(!reload);
  };
  const onUpdate = (item: string) => {
    setResID(item);
  };
  const onDelete = async (item: string) => {
    try {
      // Make a DELETE request to the backend with the item as a parameter
      const response = await axios.delete(
        `http://localhost:5000/api/household/delete/${item}`
      );

      // Log or handle the successful deletion response
      console.log("Data deleted successfully:", response.data);
      AddToLog(`Data Deleted --Household-- ID:${item}`);
      setReload(!reload);
    } catch (error) {
      // Handle any errors that occur during the deletion
      console.error("Error deleting data:", error);
    }
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
    setCurrentCount(filteredData.length);
  }, [filteredData]);
  return (
    <div>
      <div className="topContainerTableData">
        <div>
          <div className="topContainerTableDataText">
            Total Number of Houses:{" "}
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
          {filteredData.map((item, index) => (
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
        <AddForm1 residentId={resID} onItemClick={handleAddClick} />
      </div>

      {isUpdating && <div className="backdrop"></div>}
    </div>
  );
};

export default MainContentAreaHtables;
