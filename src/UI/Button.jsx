import React from 'react';
import styled from 'styled-components';

const StyledCommonButton = styled.button`
    display: block;
    width: 100%;
    color: black;
    font-size: 22px;
    font-family: Avimir, sans-serif;
    background: none;
    cursor: pointer;
    border: 1px solid #D58CAA;
    border-radius: 5px;
    padding: 5px;
    transition: 0.2s ease-in-out;

    &:hover {
        color: white;
        background: #D58CAA;
    }
`



const Button = ({ children, onClick }) => {
  return (
    <StyledCommonButton onClick={onClick}>{children}</StyledCommonButton>
  )
}


export default Button;
