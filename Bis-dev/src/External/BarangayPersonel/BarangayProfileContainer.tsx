import React, { useEffect, useState } from "react";
import "./BarangayPersonel.css";
import BarangayPersonelProfile from "./BarangayPersonelProfile";
import BarRight from "../BarRight";
import BarLeft from "../BarLeft";

interface theData {
  id: string;
  full_name: string;
  type: string;
  image: string;
}
interface Props {
  type: string;
  name: string;
}
const BarangayProfileContainer = ({ type, name }: Props) => {
  const [personel, setPersonel] = useState<theData[]>([]);
  // for Generating the Background Bars
  const [rowCount, setRowCount] = useState(0);
  const widthShort = ["100", "80", "300", "150"];
  const widthLong = ["1000", "1300", "700"];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/personel1/personelview"
        );
        const datas = await response.json();
        const BHW: theData[] = datas.filter(
          (person: theData) => person.type == "BHW"
        );
        const TND: theData[] = datas.filter(
          (person: theData) => person.type == "TND"
        );
        const BS: theData[] = datas.filter(
          (person: theData) => person.type == "BS"
        );

        if (type == "BHW") {
          setPersonel(BHW);
        } else if (type == "BS") {
          setPersonel(BS);
        } else if (type == "TND") {
          setPersonel(TND);
        } else {
          const response = await fetch(
            "http://localhost:5000/api/personel1/skview"
          );
          const data2 = await response.json();
          setPersonel(data2);
        }

        setRowCount(
          datas.length % 4 !== 0
            ? Math.floor(datas.length / 4) + 1
            : Math.floor(datas.length / 4)
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
            name={item.full_name}
          />
        ))}
      </div>
    </div>
  );
};

export default BarangayProfileContainer;
