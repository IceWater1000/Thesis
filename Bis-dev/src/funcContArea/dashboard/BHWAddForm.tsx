import React, { useState } from "react";
import "./dForms.css";
import { useEffect } from "react";
import axios from "axios";
import Select, { SingleValue } from "react-select";
interface theData {
  ResidentID: string;
  type: string;
  image: string;
}
interface Props {
  onItemClick: () => void;
  type: string;
  formText: string;
}
interface OptionType {
  value: string;
  label: string;
}
const BHWAddForm = ({ onItemClick, type, formText }: Props) => {
  const [imgs, setImgs] = useState<File | null>(null);
  const [theData, setTheData] = useState<theData>({
    ResidentID: "",
    type: "",
    image: "",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImgs(event.target.files[0]); // Set the file if it exists
    }
  };
  const handleSubmits = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imgs) {
      return;
    }
    const formData = new FormData();
    formData.append("ResidentID", theData.ResidentID);
    formData.append("type", type);
    if (imgs) {
      formData.append("personImage", imgs);
    } else {
      formData.append("image", theData.image);
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/personel1/personel_upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // This is important for file uploads
          },
        }
      );
      console.log("Project added:", response.data);
    } catch (error) {}
    onItemClick();
  };

  //for the react select
  const [options, setOptions] = useState<OptionType[]>([]);
  const filterOption = (options: OptionType, inputValue: string) => {
    const lastName = options.label.split(",")[0]; // Extract the surname
    return lastName.toLowerCase().includes(inputValue.toLowerCase());
  };

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/personel1/residentsNotOfficials/${0}`
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
  }, []);

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
          <p className="tl">{formText} Add Form</p>
          <button
            style={{ marginLeft: "auto" }}
            onClick={() => {
              onItemClick();
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
              required
            />
          </div>
          <button className="fButton" type="submit">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default BHWAddForm;
