import React from "react";
import HomeEmergencyNumbersBox from "./HomeEmergencyNumbersBox";
import ScrollReveal from "./ScrollReveal";

const HomeEmergencyNumbers = () => {
  return (
    <div className="HomeEmergencyNumbers">
      <div className="HomeIntroductionText">EMEREGENCY NUMBERS</div>
      <ScrollReveal direction="Bottom">
        <div className="HomeEmergencyNumbersRow">
          <HomeEmergencyNumbersBox
            img="/Images/police.png"
            name="Police"
            dept="Department"
            num1="+639221232432"
            num2="+639224137732"
          />
          <HomeEmergencyNumbersBox
            img="/Images/fire.png"
            name="Fire"
            dept="Department"
            num1="+639776857453"
            num2="+639877867564"
          />
          <HomeEmergencyNumbersBox
            img="/Images/rescue.png"
            name="Oras Rescue"
            dept="Department"
            num1="+639119877869"
            num2="+639009875843"
          />
          <HomeEmergencyNumbersBox
            img="/Images/health.png"
            name="RHU"
            dept="Department"
            num1="+639098876543"
            num2="+639879675870"
          />
        </div>
      </ScrollReveal>
    </div>
  );
};

export default HomeEmergencyNumbers;
