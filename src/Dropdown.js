import React from 'react';

export const Dropdown = ({
  id,
  options,
  selectedValue,
  onSelectedValueChange,
}) => (
  <select
    id={id}
    className="dropdown"
    defaultValue={selectedValue}
    onChange={(event) => onSelectedValueChange(event.target.value)}
  >
    {options.map(({ value, label }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);
