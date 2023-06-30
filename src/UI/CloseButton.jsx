import React from 'react';
import styled from 'styled-components';

const StyledCloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;

    &:before, &:after {
        content: ""; 
        position: absolute; 
        width: 20px;
        height: 2px;
        top: 5px;
        right: 0;
        background: orange;
    }

    &:before {
        transform: rotate(45deg);
    }
    &:after {
        transform: rotate(-45deg);
    }
`


const CloseButton = ({ onClick }) => {
    return (
      <StyledCloseButton onClick={onClick}></StyledCloseButton>
    )
  }

export default CloseButton;
