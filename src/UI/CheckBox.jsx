import React, { useState } from 'react'
import styled from 'styled-components';

const StyledCheckBox = styled.input`
  cursor: pointer;
`

const StyledLabel = styled.label`
  display: flex;
  gap: 5px;
  cursor: pointer;
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
