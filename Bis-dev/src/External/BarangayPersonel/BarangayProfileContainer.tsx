import React, { useEffect, useState } from "react";
import "./BarangayPersonel.css";
import BarangayPersonelProfile from "./BarangayPersonelProfile";
import BarRight from "../BarRight";
import BarLeft from "../BarLeft";

interface theData {
  id: string;
  name: string;
  position: string;
  other: string;
  image: string;
}
interface Props {
  url: string;
  name: string;
}
const BarangayProfileContainer = ({ url, name }: Props) => {
  const [personel, setPersonel] = useState<theData[]>([]);
  // for Generating the Background Bars
  const [rowCount, setRowCount] = useState(0);
  const widthShort = ["100", "80", "300", "150"];
  const widthLong = ["1000", "1300", "700"];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPersonel(data);
        setRowCount(
          data.length % 4 !== 0
            ? Math.floor(data.length / 4) + 1
            : Math.floor(data.length / 4)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="barangayPersonelContainer">
      <div className="personelTypeText">{name}</div>

      {Array.from({ length: rowCount }).map((_, index) =>
        Math.floor(Math.random() * 2) == 0 ? (
          Math.floor(Math.random() * 2) == 0 ? (
            <>
              <BarRight
                top={(200 + 374 * index).toString()}
                width={
                  widthShort[Math.floor(Math.random() * widthShort.length)]
                }
              />

              <BarRight
                top={(250 + 374 * index).toString()}
                width={widthLong[Math.floor(Math.random() * widthLong.length)]}
              />
            </>
          ) : (
            <>
              <BarRight
                top={(250 + 374 * index).toString()}
                width={
                  widthShort[Math.floor(Math.random() * widthShort.length)]
                }
              />

              <BarRight
                top={(200 + 374 * index).toString()}
                width={widthLong[Math.floor(Math.random() * widthLong.length)]}
              />
            </>
          )
        ) : Math.floor(Math.random() * 2) == 0 ? (
          <>
            <BarLeft
              top={(200 + 374 * index).toString()}
              width={widthShort[Math.floor(Math.random() * widthShort.length)]}
            />

            <BarLeft
              top={(250 + 374 * index).toString()}
              width={widthLong[Math.floor(Math.random() * widthLong.length)]}
            />
          </>
        ) : (
          <>
            <BarLeft
              top={(250 + 374 * index).toString()}
              width={widthShort[Math.floor(Math.random() * widthShort.length)]}
            />

            <BarLeft
              top={(200 + 374 * index).toString()}
              width={widthLong[Math.floor(Math.random() * widthLong.length)]}
            />
          </>
        )
      )}

      <div className="rowContainer">
        {personel.map((item, index) => (
          <BarangayPersonelProfile
            key={index}
            image={item.image}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default BarangayProfileContainer;
