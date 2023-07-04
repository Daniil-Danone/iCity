import React, { useState, useEffect} from 'react';
import InteractiveMap from '../components/Map';
import styled from 'styled-components';
import Wrapper from '../UI/Wrapper';
import MapBar from '../components/MapBar';
import ProfileBlock from '../components/ProfileBlock';
import ProfilePopup from '../components/ProfilePopup';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components'
import MenuBlock from '../components/MenuBlock';
import { useDispatch } from 'react-redux';
import { useMarks } from '../hooks/useMarks';


const GlobalStyle = createGlobalStyle`
  body {
    font-family: Montserrat, sans-serif;
  }
`;


const MapPageGrid = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`


const MapPage = () => {
  return (
    <Wrapper>
      <GlobalStyle/>
      <MapPageGrid>
        <MenuBlock/>
        <ProfileBlock/>
        <MapBar/>
        <InteractiveMap/>
      </MapPageGrid>
    </Wrapper>
  )
}

export default MapPage;
