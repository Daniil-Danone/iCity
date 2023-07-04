import React from 'react';
import styled from 'styled-components';

const StyledPositiveButton = styled.button`
    display: block;
    width: 100%;
    color: #2185fb;
    font-size: 22px;
    font-family: Avimir, sans-serif;
    background: none;
    cursor: pointer;
    border: 1px solid #2185fb;
    border-radius: 5px;
    padding: 5px;
    transition: 0.2s ease-in-out;

    &:hover {
        color: white;
        background: #2185fb;
    }
`


const Button = ({ children, onClick }) => {
  return (
    <StyledPositiveButton onClick={onClick}>{children}</StyledPositiveButton>
  )
}


export default Button;
