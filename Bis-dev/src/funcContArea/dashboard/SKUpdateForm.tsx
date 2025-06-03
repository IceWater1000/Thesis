import React, { useState } from "react";
import "./dForms.css";
import { useEffect } from "react";
import axios from "axios";
import UpdateForm3 from "../functionsBar/addForms/UpdateForm3";
import { useActionData } from "react-router-dom";
import Select, { SingleValue } from "react-select";
interface theData {
  id: string;
  ResidentID: string;
  full_name: string;
  position: string;
  image: string;
}
interface Props {
  items: string;
  onItemClick: () => void;
}
interface OptionType {
  value: string;
  label: string;
}
const SKUpdateForm = ({ items, onItemClick }: Props) => {
  const [reloader, setReloader] = useState(false);
  const [imgs, setImgs] = useState<File | null>(null);
  const [theData, setTheData] = useState<theData>({
    id: "",
    ResidentID: "",
    position: "",
    full_name: "",

    image: "",
  });

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/personel1/specificsk/${items}`
      );
      const data = await response.json();
      console.log(data);
      setTheData(data[0]);
    };
    getData();
  }, [items]);
  //input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTheData({
      ...theData,
      [name]: value,
    });

    // on submission
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImgs(event.target.files[0]); // Set the file if it exists
    }
  };
  const handleSubmits = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("id", theData.id);
    formData.append("residentID", theData.ResidentID);
    formData.append("name", theData.full_name);

    if (imgs) {
      formData.append("personImage", imgs);
    } else {
      formData.append("image", theData.image);
    }

    try {
      console.log(theData.image);
      const response = await axios.post(
        `http://localhost:5000/api/personel1/updatesk`,
        formData
      );
      console.log(response);
      /*
      const response = await axios.post(
        `http://localhost:5000/api/personel1/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // This is important for file uploads
          },
        }
      );
      console.log("Project added:", response.data);
      */
    } catch (error) {}
    setReloader(!reloader);
    onItemClick();
  };
  // for react select options
  const [options, setOptions] = useState<OptionType[]>([]);
  const filterOption = (options: OptionType, inputValue: string) => {
    const lastName = options.label.split(",")[0]; // Extract the surname
    return lastName.toLowerCase().includes(inputValue.toLowerCase());
  };

  useEffect(() => {
    const fetchResidents = async () => {
      if (!theData.ResidentID) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/personel1/residentsNotOfficials/${theData.ResidentID}`
        );
        const transformResponse: OptionType[] = response.data.map(
          (residents: any) => ({
            value: residents.ResidentID,
            label: residents.Name,
          })
        );

        setOptions(transformResponse);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchResidents();
  }, [reloader, theData.ResidentID]);

  const handleReactSelectChange = (option: SingleValue<OptionType>) => {
    const value = option?.value || "";
    setTheData({
      ...theData,
      ResidentID: value,
    });
  };

  return (
    <>
      <div className="theForm">
        <div style={{ display: "flex", gap: "24px" }}>
          <p className="tl">Barangay Official Form</p>
          <button
            style={{ marginLeft: "auto" }}
            onClick={() => {
              onItemClick();
              setReloader(!reloader);
            }}
          >
            Exit
          </button>
        </div>

        <form onSubmit={handleSubmits}>
          <div className="thefor">
            <label>Name: </label>

            <Select
              options={options}
              name="ResidentID"
              id="ResidentID"
              filterOption={filterOption}
              value={options.find(
                (option) => option.value == theData.ResidentID
              )}
              onChange={handleReactSelectChange}
              className="reactSelect2 "
              required
              //isMulti={false} // Set to true for multi-select
            />
          </div>

          <div className="thefor">
            <label>Image:</label>
            <input
              type="file"
              name="personImage"
              onChange={handleImageChange}
            />
          </div>
          <button className="fButton" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default SKUpdateForm;
