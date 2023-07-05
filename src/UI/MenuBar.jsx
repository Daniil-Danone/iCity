import React from 'react'
import styled from 'styled-components'

const StyledMenuBar = styled.div`
    display: flex;
    flex-direction: column;
    width: 380px;
    min-width: 380px;
    gap: 20px;
    padding: 20px 20px 40px 20px;
    box-sizing: border-box;
    box-shadow: 0 0 2px 0;
    
    background-color: #f0f5fa;
    z-index: 1;
`

const MenuBar = ({ children }) => {
  return (
    <StyledMenuBar>
      { children }
    </StyledMenuBar>
  )
}

export default MenuBar
