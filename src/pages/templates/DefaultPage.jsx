import React from 'react';
import Wrapper from '../../UI/Wrapper';
import Navbar from '../../components/Navbar';
import Container from '../../UI/Container';
import Footer from '../../components/Footer';

const DefaultPage = ({ children }) => {
  return (
    <Wrapper>
        <Navbar/>
        <Container>
            {children}
        </Container>
        <Footer/>
    </Wrapper>
  )
}

export default DefaultPage;
