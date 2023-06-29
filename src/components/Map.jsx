import React from 'react'
import map from '../images/map.png'
import styled from 'styled-components'
import RegistrationForm from './RegistrationForm'

const Container = styled.div`
  display: flex;
  margin: 100px auto;
  width: calc(100% - 500px);
  gap: 40px;
  justify-content: space-between;
`
const MapWindow = styled.div`
  display: block;
  width: 100%;
  border: 4px solid orange;
  border-radius: 4px;
`
const Categories = styled.div`
  display: block;
  width: 100%;
  border: 4px solid orange;
  border-radius: 10px;
`

const Map = () => {
  const myAPIKey = '3912292594194c23860f7ee69a54b709'
  const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';
  return (
    <Container>
      <MapWindow>
        <img src={ map }></img>
      </MapWindow>
      <Categories>
        <ul>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
      </Categories>
    </Container>
  )
}

export default Map
