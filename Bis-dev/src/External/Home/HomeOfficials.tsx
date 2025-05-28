import React, { useEffect, useState } from "react";
import HomeOfficialsBox from "./HomeOfficialsBox";
import ScrollReveal from "./ScrollReveal";
import BarRight from "../BarRight";
import BarLeft from "../BarLeft";

interface Officials {
  id: string;
  image: string;
  full_name: string;
  other: string;
  position: string;
}
interface OfficialsYear {
  year: string;
  officials: Officials[];
}
const HomeOfficials = () => {
  const [officialsData, setOfficialsData] = useState<Officials[]>([]);
  useEffect(() => {
    console.log("aqweqweqweqweqw");
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
            name={officialsData[0]?.full_name}
            committee={officialsData[0]?.other}
            position={officialsData[0]?.position}
            img={officialsData[0]?.image}
          />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="Bottom">
        <div className="HomeOfficialsRow">
          <HomeOfficialsBox
            name={officialsData[1]?.full_name}
            committee={officialsData[1]?.other}
            position={officialsData[1]?.position}
            img={officialsData[1]?.image}
          />
          <HomeOfficialsBox
            name={officialsData[2]?.full_name}
            committee={officialsData[2]?.other}
            position={officialsData[2]?.position}
            img={officialsData[2]?.image}
          />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="Bottom">
        <div className="HomeOfficialsRow">
          <HomeOfficialsBox
            name={officialsData[3]?.full_name}
            committee={officialsData[3]?.other}
            position={officialsData[3]?.position}
            img={officialsData[3]?.image}
          />
          <HomeOfficialsBox
            name={officialsData[4]?.full_name}
            committee={officialsData[4]?.other}
            position={officialsData[4]?.position}
            img={officialsData[4]?.image}
          />
          <HomeOfficialsBox
            name={officialsData[5]?.full_name}
            committee={officialsData[5]?.other}
            position={officialsData[5]?.position}
            img={officialsData[5]?.image}
          />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="Bottom">
        <div className="HomeOfficialsRow">
          <HomeOfficialsBox
            name={officialsData[6]?.full_name}
            committee={officialsData[6]?.other}
            position={officialsData[6]?.position}
            img={officialsData[6]?.image}
          />
          <HomeOfficialsBox
            name={officialsData[7]?.full_name}
            committee={officialsData[7]?.other}
            position={officialsData[7]?.position}
            img={officialsData[7]?.image}
          />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="Bottom">
        <div className="HomeOfficialsRow">
          <HomeOfficialsBox
            name={officialsData[8]?.full_name}
            committee={officialsData[8]?.other}
            position={officialsData[8]?.position}
            img={officialsData[8]?.image}
          />
        </div>
      </ScrollReveal>
      <ScrollReveal direction="Bottom">
        <div className="HomeOfficialsRow">
          <HomeOfficialsBox
            name={officialsData[9]?.full_name}
            committee={officialsData[9]?.other}
            position={officialsData[9]?.position}
            img={officialsData[9]?.image}
          />
          <HomeOfficialsBox
            name={officialsData[10]?.full_name}
            committee={officialsData[10]?.other}
            position={officialsData[10]?.position}
            img={officialsData[10]?.image}
          />
        </div>
      </ScrollReveal>
    </div>
  );
};

export default HomeOfficials;
