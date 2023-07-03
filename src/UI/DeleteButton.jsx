import React from 'react'
import { styled } from 'styled-components'
import Button from './Button'

const StyledDeleteButton = styled(Button)`
    border-color: red;

    &:hover {
        background-color: red;
    }
`


const DeleteButton = ({ children, onClick }) => {
    return (
      <StyledDeleteButton onClick={onClick}>{children}</StyledDeleteButton>
    )
  }

export default DeleteButton;
