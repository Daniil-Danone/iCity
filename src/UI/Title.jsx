import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.div`
    font-size: 25px;
    text-align: center;
    margin-bottom: 10px;
`

const Title = ({ children }) => {
  return (
    <StyledTitle>
      { children }
    </StyledTitle>
  )
}

export default Title
