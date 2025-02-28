import React, { useEffect, useState } from "react";
import "./tables.css";
import "../functionsBar/FunctionsBar.css";
import axios from "axios";
import UpdateForm7 from "../functionsBar/addForms/UpdateForm7";
interface accountData {
  username: string;
  password: string;
  userTrueName: string;
  position: string;
  usertype: string;
}
interface Props {
  type: string;
  addValue: boolean;
}
const MainContentAreaAccounts = ({ addValue, type }: Props) => {
  console.log(type);
  const [reload, setReload] = useState(true);
  const [accountDatas, SetAccountDatas] = useState<accountData[]>([]);
  //Showing Delete Confirmation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  //Showing Update UI

  const [accountUpdating, setAccountUpdating] = useState(false);
  const [accountToBeUpdated, setAccountToBeUpdated] = useState("");

  //for table generation
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/login/viewAccount"
        );
        SetAccountDatas(response.data);
      } catch (err) {
        console.log("error");
      }
    };
    fetchAccounts();
  }, [addValue, reload]);

  //For Deleting
  const onDelete = async (item: string) => {
    try {
      // Make a DELETE request to the backend with the item as a parameter
      const response = await axios.delete(
        `http://localhost:5000/api/login/delete/${item}`
      );

      // Log or handle the successful deletion response
      console.log("Data deleted successfully:", response.data);
      setReload(!reload);
    } catch (error) {
      // Handle any errors that occur during the deletion
      console.error("Error deleting data:", error);
    }
  };
  //for updating

  const handleUpdateCloseClick = () => {
    setReload(!reload);
    setAccountUpdating(!accountUpdating);
  };

  const handleUpdateClick = (item: string) => {
    setAccountToBeUpdated(item);
    setAccountUpdating(!accountUpdating);
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            {accountDatas.length > 0 &&
              Object.keys(accountDatas[0]).map((key, index) => (
                <th className="thContent" key={`header-${key}-${index}`}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "5px",
                    }}
                  >
                    {key}
                  </div>
                </th>
              ))}
            <th className="thContent">Action</th>
          </tr>
        </thead>
        <tbody>
          {accountDatas.map((item, index) => (
            <tr>
              {index == 0 && type != "admin" ? (
                ""
              ) : (
                <>
                  {Object.values(item).map((val) => (
                    <td> {val}</td>
                  ))}
                  <td>
                    <div className="actionColumn">
                      <div
                        className="update"
                        onClick={() => {
                          handleUpdateClick(Object.values(item)[0] as string);
                        }}
                      >
                        Update
                      </div>
                      {index == 0 || type == "secretary" ? (
                        ""
                      ) : (
                        <div
                          className="delete"
                          onClick={() => {
                            setItemToDelete(Object.values(item)[0] as string); // Set the selected item
                            setIsModalOpen(true);
                          }}
                        >
                          Delete
                        </div>
                      )}
                    </div>
                  </td>
                </>
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
                  onDelete(itemToDelete!);
                  setIsModalOpen(false);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className={`accountUpdate ${accountUpdating ? "show" : ""}`}>
          <UpdateForm7
            acc={accountToBeUpdated}
            closes={handleUpdateCloseClick}
          />
        </div>
        {accountUpdating ? (
          <div
            className={`accountAddingFormDark ${accountUpdating ? "show" : ""}`}
            onClick={() => {
              handleUpdateCloseClick();
            }}
          ></div>
        ) : (
          ""
        )}
      </table>
    </>
  );
};

export default MainContentAreaAccounts;
