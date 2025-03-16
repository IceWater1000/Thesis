import React, { useEffect, useState } from "react";
import "./ConfirmationModal.css";
interface Props {
  HouseNumber: string;
  RelationShip: number;
  CurrentState: boolean;
  OnCancelClick: () => void;
  OnConfirmClick: () => void;
}
const ListOfRelations = [
  "Father",
  "Mother",
  "Son",
  "Daughter",
  "Aunt",
  "Uncle",
  "GrandParent",
  "GrandSon/GrandDaughter",
  "Cousin",
  "Neice/Nephew",
  "Friend",
  "Spouse",
  "Brother",
  "Sister",
];
const HouseMembersAddingConfirmation = ({
  HouseNumber,
  RelationShip,
  OnCancelClick,
  OnConfirmClick,
  CurrentState,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen((prev) => !prev);
    console.log(HouseNumber);
  }, [CurrentState]);

  return (
    <>
      <div className={`BackDrop ${isOpen ? "Show" : ""}`}>
        <div className="HouseMemberConfirmationModal">
          <div className="ConfirmationHeadText">Adding Household Member</div>
          <hr className="ConfirmationLine"></hr>
          <div className="ConfirmationBodyText">
            Are you sure you want to add this Person as a Household Member of
            Household Number: <strong>{HouseNumber}</strong> with the
            relationship to Household Head as{" "}
            <strong>{ListOfRelations[RelationShip - 1]}</strong>?
          </div>
          <hr className="ConfirmationLine"></hr>
          <div className="ConfirmationModalButtonContainer">
            <div className="ConfirmationButton" onClick={OnConfirmClick}>
              Confirm
            </div>
            <div className="ConfirmationButton" onClick={OnCancelClick}>
              Cancel
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HouseMembersAddingConfirmation;
