import React from 'react'
import styled from 'styled-components';

const StyledCheckBox = styled.input`
  cursor: pointer;
`

const StyledLabel = styled.label`
  display: flex;
  gap: 5px;
  cursor: pointer;
  margin-bottom: 10px;
`

const CheckBox = ({ label, isChecked, setIsChecked }) => {
    return (
      <StyledLabel>
        <StyledCheckBox type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
        {label}
      </StyledLabel>
    
      );
};

export default CheckBox;
