import React from "react";
interface Props {
  selectChange: (item: string) => void;
}

const YearPicker = ({ selectChange }: Props) => {
  const currentYear = new Date().getFullYear();
  let yearSelector = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => currentYear - i
  );

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    selectChange(value.toString());
  };
  return (
    <div>
      <select defaultValue={currentYear} onChange={onSelectChange}>
        {yearSelector.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearPicker;
