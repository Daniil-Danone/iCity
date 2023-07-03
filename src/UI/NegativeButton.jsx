import React from 'react'
import { styled } from 'styled-components'
import Button from './Button'

const StyledNegativeButton = styled.button`
    display: block;
    width: 100%;
    color: black;
    font-size: 22px;
    font-family: Avimir, sans-serif;
    background: none;
    cursor: pointer;
    border: 1px solid red;
    border-radius: 5px;
    padding: 5px;
    transition: 0.2s ease-in-out;

    &:hover {
        color: white;
        background: red;
    }
`

const NegativeButton = ({ children, onClick }) => {
    return (
      <StyledNegativeButton onClick={onClick}>{children}</StyledNegativeButton>
    )
  }

export default NegativeButton;
