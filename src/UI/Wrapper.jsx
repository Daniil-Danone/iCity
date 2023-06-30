import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;

  flex-direction: column;
  font-family: Montserrat, sans-serif;
`


const Wrapper = ({ children }) => {
  return (
    <StyledWrapper>{ children }</StyledWrapper>
  )
}

export default Wrapper;
