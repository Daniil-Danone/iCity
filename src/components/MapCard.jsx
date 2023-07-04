import React from 'react';
import styled from 'styled-components';
import cityImg from '../images/test.jpg';

const Card = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    cursor: pointer;
    background-color: #ffffff;
    border-radius: 10px;
    margin-right: 5px;
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 8px;
`
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`
const Type = styled.div`
font-size: 10px;
`
const Description = styled.small`
  font-size: 13px;
`
const Geodata = styled.div`
  font-size: 10px;
`

const CardImgContainer = styled.div`
  height: 100%;
`

const CardImg = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: top center;
  height: 100%;
  border-radius: 0 10px 10px 0;
`


const MapCard = ({ mark }) => {
  return (
    <Card>
      <CardInfo>
        <Title>{mark.title}</Title>
        <Type>Тип: {mark.type}</Type>
        <Description>{mark.description}</Description>
        <Geodata>{mark.xpos} {mark.ypos}</Geodata>
      </CardInfo>
      <CardImgContainer>
        <CardImg src={cityImg}/>
      </CardImgContainer>
    </Card>
  )
}

export default MapCard;
