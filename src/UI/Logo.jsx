import React from 'react'
import styled from 'styled-components'


const StyledLogo = styled.a`
    color: #D58CAA;
    font-size: 26px;
    line-height: 50px;
    font-size: 50px;
    padding-bottom: 20px;
    border-bottom: 4px solid #D58CAA;
    transition: 0.2s ease;

    &:hover {
        cursor: pointer;
        color: orange;
        text-decoration: none;
    }

    &:visited {
        color: black;
        text-decoration: none;
    }
`

const Logo = ({ children }) => {
  return (
    <StyledLogo>
      { children }
    </StyledLogo>
  )
}

export default Logo;
