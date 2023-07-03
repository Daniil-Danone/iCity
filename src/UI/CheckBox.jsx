import React, { useState } from 'react'

const CheckBox = ({ label }) => {
    const [isChecked, setIsChecked] = useState(false);
  return (
  <label>
    <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
    {label}
    </label>
    );
};

export default CheckBox;
