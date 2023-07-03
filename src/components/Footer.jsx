import React from 'react';
import styled from 'styled-components';

const FooterBlock = styled.footer`
    text-align: center;
    height: 40px;
    background-color: #ffffff;
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
