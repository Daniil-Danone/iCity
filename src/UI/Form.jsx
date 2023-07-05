import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background: #ffffff;
`

const Form = ({ children }) => {
  return (
    <StyledForm>
        { children }
    </StyledForm>
  )
}

export default Form
