import React from 'react'
import styled from 'styled-components'

const StyledInfoPopup = styled.div`
  display: block;
  width: auto;
  left: 50%;
  bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 2px #2185fb solid;
  background: #f0f5fa;
  box-shadow: 1px 1px 2px;
  position: absolute;
  text-align: center;
  z-index: 1;
  transform: translate(-50%);
`

const InfoPopup = ({ children, active }) => {
  return (
    <>
      {active ? 
        <StyledInfoPopup>{children}</StyledInfoPopup> :
        <></>
      }
    </>
  )
}

export default InfoPopup
