import axios from "axios";
import React, { useState } from "react";
interface Props {
  onItemClick: () => void;
}
interface data {
  Label: string;
}
const DashboardUICarouselAddform = ({ onItemClick }: Props) => {
  const [imgs, setImgs] = useState<File | null>(null);
  const [data, setData] = useState<data>({
    Label: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImgs(event.target.files[0]); // Set the file if it exists
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imgs) {
      return;
    }
    const formData = new FormData();
    formData.append("Label", data.Label);
    formData.append("barangayImage", imgs);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/homeDashboard/uploadBarangayImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // This is important for file uploads
          },
        }
      );
    } catch (error) {}
    onItemClick();
  };
  return (
    <div className="CarouselAddform">
      <div className="DashboardUISectionHeader">Carousel Image Add</div>
      <hr className="BlueLine"></hr>
      <form className="CarouselForm" onSubmit={handleSubmit}>
        <label className="DashboardUILabel">Image Label:</label>
        <input
          className="DashboardUIInput"
          type="text"
          name="Label"
          value={data.Label}
          onChange={handleChange}
          required
        />
        <label className="DashboardUILabel">Image</label>
        <input
          className="DashboardUIInput"
          type="file"
          name="barangayImage"
          onChange={handleImageChange}
          required
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "24px",
            marginLeft: "auto",
            marginTop: "12px",
          }}
        >
          <button type="submit" className="DashboardUIButton">
            Save
          </button>

          <button className="DashboardUIButton" onClick={onItemClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardUICarouselAddform;
