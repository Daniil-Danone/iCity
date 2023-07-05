import React, { useState } from 'react';
import EventsList from '../components/EventsList';
import Wrapper from '../UI/Wrapper';
import { styled } from 'styled-components';
import MenuBlock from '../components/MenuBlock';
import ProfileBlock from '../components/ProfileBlock';
import EventBar from '../components/EventBar';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Montserrat, sans-serif;
  }
`;

const EventsPageGrig = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`

const EventsPage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));
  
  return (
    <Wrapper>
      <GlobalStyle/>
      <ProfileBlock user={user} setUser={setUser} isLogin={isLogin} setIsLogin={setIsLogin}/>
      <MenuBlock/>
      <EventsPageGrig>
        <EventBar/>
        <EventsList/>
      </EventsPageGrig>
    </Wrapper>
  )
}

export default EventsPage;
