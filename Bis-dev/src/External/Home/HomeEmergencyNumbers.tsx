import React, { useEffect, useState } from "react";
import HomeEmergencyNumbersBox from "./HomeEmergencyNumbersBox";
import ScrollReveal from "./ScrollReveal";
import axios from "axios";

interface Numbers {
  Name: string;
  Number: string[];
}
const HomeEmergencyNumbers = () => {
  const [data, setData] = useState<Numbers[]>([]);
  //Data Collector
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/homeDashboard/getData"
        );

        setData(response.data.Numbers);
      } catch (error) {
        console.log("Error on the Backend");
      }
    };
    FetchData();
  }, []);

  return (
    <div className="HomeEmergencyNumbers">
      <div className="HomeIntroductionText">EMEREGENCY NUMBERS</div>
      <ScrollReveal direction="Bottom">
        <div className="HomeEmergencyNumbersRow">
          <HomeEmergencyNumbersBox
            img="/Images/police.png"
            name="Police"
            dept="Department"
            num1={data[0]?.Number[0] || ""}
            num2={data[0]?.Number[1] || ""}
          />
          <HomeEmergencyNumbersBox
            img="/Images/fire.png"
            name="Fire"
            dept="Department"
            num1={data[1]?.Number[0] || ""}
            num2={data[1]?.Number[1] || ""}
          />
          <HomeEmergencyNumbersBox
            img="/Images/rescue.png"
            name="Oras Rescue"
            dept="Department"
            num1={data[2]?.Number[0] || ""}
            num2={data[2]?.Number[1] || ""}
          />
          <HomeEmergencyNumbersBox
            img="/Images/health.png"
            name="RHU"
            dept="Department"
            num1={data[3]?.Number[0] || ""}
            num2={data[3]?.Number[1] || ""}
          />
        </div>
      </ScrollReveal>
    </div>
  );
};

export default HomeEmergencyNumbers;
