import React from "react";
interface Ordinances {
  id: string;
  title: string;
  description: string;
  image: string[];
  ordinanceNumber: string;
  year: string;
}

const OrdinancesBox = ({
  id,
  title,
  description,
  image,
  ordinanceNumber,
  year,
}: Ordinances) => {
  return (
    <div className="ordinancesBox" key={id}>
      <div className="ordinancesBoxTitle">
        Ordinance No. {ordinanceNumber} Series of {year}
      </div>
      <div className="ordinancesBoxTitle"> {title}</div>
      <div style={{ padding: "0px 24px 24px 24px" }}>
        <hr className="blueLine"></hr>
      </div>

      <div className="ordinancesBoxDescription">{description}</div>
      <div className="ordinancesBoxImageContainer">
        {image.map((item, index) => (
          <img className="ordinancesBoxImage" src={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default OrdinancesBox;
