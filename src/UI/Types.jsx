import React from 'react'
import styled from 'styled-components'

const StyledTypes = styled.div`
    display: flex;
    justify-content: space-between;
`

const Types = ({ children }) => {
  return (
    <StyledTypes>
      { children }
    </StyledTypes>
  )
}

export default Types
