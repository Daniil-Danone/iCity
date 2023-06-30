import React from 'react';
import styled from 'styled-components';

const FooterBlock = styled.footer`
    text-align: center;
    width: 100vw;
    height: 40px;
    background-color: #d0d7de;
    align-items: center;
`

const Footer = () => {
  return (
    <FooterBlock>
        <p>Я футер</p>
    </FooterBlock>
  )
}

export default Footer;
