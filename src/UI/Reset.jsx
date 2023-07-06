import React from 'react'
import styled from 'styled-components'


const StyledReset = styled.small`
    font-size: 13px;
    color: lightgray;
    text-decoration: underline;

    &:hover {
        cursor: pointer;
    }
`

const Reset = ({onClick, children}) => {
  return (
    <StyledReset onClick={onClick}>
      { children }
    </StyledReset>
  )
}

export default Reset
