import React from 'react'
import styled from 'styled-components'

const StyledAccordion = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

`

const Accordion = ({ children }) => {
  return (
    <StyledAccordion>
      { children }
    </StyledAccordion>
  )
}

export default Accordion;
