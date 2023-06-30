import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.main`
  position: relative;
  flex: 1;
  padding: 0 calc(50% - 585px);
`


const Container = ({ children }) => {
  return (
    <StyledContainer>{ children }</StyledContainer>
  )
}

export default Container;
