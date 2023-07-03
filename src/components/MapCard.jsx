import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    display: block;
    cursor: pointer;
    border: 1px solid #C17A96;
    border-radius: 10px;
    padding: 10px;
    margin-right: 5px;
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
        <Title>{mark.title}</Title>
        <Description>{mark.description}</Description>
        <Geodata>{mark.xpos} {mark.ypos}</Geodata>
    </Card>
  )
}

export default MapCard;
