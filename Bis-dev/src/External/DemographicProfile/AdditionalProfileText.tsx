import React, { useEffect, useState } from "react";
interface Props {
  Text: string;
  url: string;
}
interface urlVal {
  val: string;
}
const AdditionalProfileText = ({ Text, url }: Props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result: string = await response.json();

        const firstVal = Object.values(result[0])[0].toString();
        // Dynamically get the first property value in the object

        setValue(firstVal);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="DemographicProfileText">
      {Text}: <span style={{ textDecoration: "underline" }}>{value}</span>
    </div>
  );
};

export default AdditionalProfileText;
