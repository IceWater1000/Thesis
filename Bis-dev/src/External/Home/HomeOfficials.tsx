import React, { useEffect, useState } from "react";
import HomeOfficialsBox from "./HomeOfficialsBox";
import ScrollReveal from "./ScrollReveal";
import BarRight from "../BarRight";
import BarLeft from "../BarLeft";

interface Officials {
  id: string;
  image: string;
  name: string;
  other: string;
  position: string;
}
interface OfficialsYear {
  year: string;
  officials: Officials[];
}
const HomeOfficials = () => {
  const [officialsData, setOfficialsData] = useState<OfficialsYear[]>([
    {
      year: "",
      officials: Array(11).fill({
        id: "",
        image: "",
        name: "",
        other: "",
        position: "",
      }),
    },
  ]);
  useEffect(() => {
    const fetchOfficials = async () => {
      const response = await fetch("http://localhost:5000/api/personel1/view");
      const data = await response.json();
      setOfficialsData(data);
    };
    fetchOfficials();
  }, []);

  return (
    <div className="HomeOfficials">
      <div className="HomeIntroductionText">THE BARANGAY COUNCIL</div>
      <BarRight width="392" top="172" />
      <BarRight width="136" top="224" />
      <BarRight width="191" top="615" />
      <BarRight width="191" top="1357" />
      <BarLeft width="136" top="303" />
      <BarLeft width="392" top="355" />
      <BarLeft width="85" top="627" />
      <BarLeft width="392" top="1712" />
      <BarLeft width="151" top="1770" />
      <BarLeft width="151" top="2210" />
      <ScrollReveal direction="Bottom">
        <div className="HomeOfficialsRow">
          <HomeOfficialsBox
            name={officialsData[0].officials[0].name}
            committee={officialsData[0].officials[0].name}
            position={officialsData[0].officials[0].position}
            img={officialsData[0].officials[0].image}
          />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="Bottom">
        <div className="HomeOfficialsRow">
          <HomeOfficialsBox
            name={officialsData[0].officials[1].name}
            committee={officialsData[0].officials[1].name}
            position={officialsData[0].officials[1].position}
            img={officialsData[0].officials[1].image}
          />
          <HomeOfficialsBox
            name={officialsData[0].officials[2].name}
            committee={officialsData[0].officials[2].name}
            position={officialsData[0].officials[2].position}
            img={officialsData[0].officials[2].image}
          />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="Bottom">
        <div className="HomeOfficialsRow">
          <HomeOfficialsBox
            name={officialsData[0].officials[3].name}
            committee={officialsData[0].officials[3].name}
            position={officialsData[0].officials[3].position}
            img={officialsData[0].officials[3].image}
          />
          <HomeOfficialsBox
            name={officialsData[0].officials[4].name}
            committee={officialsData[0].officials[4].name}
            position={officialsData[0].officials[4].position}
            img={officialsData[0].officials[4].image}
          />
          <HomeOfficialsBox
            name={officialsData[0].officials[5].name}
            committee={officialsData[0].officials[5].name}
            position={officialsData[0].officials[5].position}
            img={officialsData[0].officials[5].image}
          />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="Bottom">
        <div className="HomeOfficialsRow">
          <HomeOfficialsBox
            name={officialsData[0].officials[6].name}
            committee={officialsData[0].officials[6].name}
            position={officialsData[0].officials[6].position}
            img={officialsData[0].officials[6].image}
          />
          <HomeOfficialsBox
            name={officialsData[0].officials[7].name}
            committee={officialsData[0].officials[7].name}
            position={officialsData[0].officials[7].position}
            img={officialsData[0].officials[7].image}
          />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="Bottom">
        <div className="HomeOfficialsRow">
          <HomeOfficialsBox
            name={officialsData[0].officials[10].name}
            committee={officialsData[0].officials[10].name}
            position={officialsData[0].officials[10].position}
            img={officialsData[0].officials[10].image}
          />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="Bottom">
        <div className="HomeOfficialsRow">
          <HomeOfficialsBox
            name={officialsData[0].officials[8].name}
            committee={officialsData[0].officials[8].name}
            position={officialsData[0].officials[8].position}
            img={officialsData[0].officials[8].image}
          />
          <HomeOfficialsBox
            name={officialsData[0].officials[9].name}
            committee={officialsData[0].officials[9].name}
            position={officialsData[0].officials[9].position}
            img={officialsData[0].officials[9].image}
          />
        </div>
      </ScrollReveal>
    </div>
  );
};

export default HomeOfficials;
