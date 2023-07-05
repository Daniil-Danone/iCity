import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    width: calc(100% - 22px);
    margin: 10px auto;
    line-height: 50px;
    padding-left: 20px;
    background: rgba(0, 0, 0, 0.05);
    border: none;
    outline: none;
    border-radius: 5px;
    font-family: Avimir, sans-serif;
    transition: 0.2s ease-in-out;

    &:focus {
        background: rgba(255, 165, 0, 0.1);
    }
`


const Input = ({ type, children, placeholder, value, onChange, style }) => {
  return (
    <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} style={style}>{children}</StyledInput>
  )
}

export default Input;
