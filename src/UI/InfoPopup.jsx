import React from 'react'
import styled from 'styled-components'

const StyledInfoPopup = styled.div`
  display: block;
  width: auto;
  left: 50%;
  top: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  text-align: center;
  z-index: 1;
  transform: translate(-50%);
`

const InfoPopup = ({ children }) => {
  return (
    <StyledInfoPopup>
      { children }
    </StyledInfoPopup>
  )
}

export default InfoPopup
