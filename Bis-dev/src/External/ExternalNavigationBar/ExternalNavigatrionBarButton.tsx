import React from "react";
interface Props {
  label: string;
  lastChild: boolean;
  urls: string;
  onItemClick: (item: string, second: string) => void;
  Active: string;
}
const ExternalNavigatrionBarButton = ({
  label,
  urls,
  lastChild,
  onItemClick,
  Active,
}: Props) => {
  return (
    <div
      className={`NavButtonLabel ${Active == label ? "active" : ""} ${
        lastChild ? "last" : ""
      }`}
      onClick={() => {
        onItemClick(label, urls);
      }}
    >
      {label}
    </div>
  );
};

export default ExternalNavigatrionBarButton;
