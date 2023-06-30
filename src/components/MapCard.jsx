import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    display: block;
    cursor: pointer;
    border: 1px solid orange;
    border-radius: 10px;
    padding: 10px;
`
const Title = styled.h3`
`
const Description = styled.p`
`
const Geodata = styled.small`
`


const MapCard = ({ mark }) => {
  return (
    <Card>
        <Title>{mark.title + ' (ID: ' + mark.id + ')'}</Title>
        <Description>{mark.description}</Description>
        <Geodata>{mark.xpos} {mark.ypos}</Geodata>
    </Card>
  )
}

export default MapCard;
