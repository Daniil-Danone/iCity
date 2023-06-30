import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  color: black;
  text-decoration: none;

  transition: 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    color: orange;
    text-decoration: none;
  }
`


const Link = ({ children, onClick, href }) => {
  return (
    <StyledLink href={href} onClick={onClick}>{children}</StyledLink>
  )
}

export default Link;
