import React from 'react';
import DefaultPage from './templates/DefaultPage';
import InteractiveMap from '../components/Map';


const MapPage = () => {
  return (
    <DefaultPage>
      <InteractiveMap/>
    </DefaultPage>
  )
}

export default MapPage;
