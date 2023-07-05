import React from 'react';
import styled from 'styled-components';
import date from '../images/dateIcon.png'
import user from '../images/userIcon.png'
import mark from '../images/markIcon.png'
import gamepadImg from '../images/gamepadIcon.png';
import footballImg from '../images/footballIcon.png';
import basketballImg from '../images/basketballIcon.png';
import bikeImg from '../images/bikeIcon.png';
import questionImg from '../images/questionIcon.png'



const Container = styled.div`
  width: 300px;
  height: 180px;
  padding: 5px;
  border: 2px #2185fb solid;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
  box-shadow: 1px 1px 2px;
`
const EventTitle = styled.h2`
  margin: 0 auto;
  float: top;
  color: #4B4B4B;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 20px;
`

const EventText = styled.h2`
  
  color: #595959;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left:10px;
  
`

const DescriprionContainer =styled.div`
  width:270px;
  height:110px;
  display:flex;
  justify-content:space-between;
`

const EventBox = styled.div`
  
`
const EventButton = styled.button`
  background: none;
  border: 2px solid orange;
  border-radius: 5px;
  color: orange;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 20px;
  cursor: pointer;
  padding: 5px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: orange;
    color: white;
  }
`

const EventItemBlock = styled.div`
  width:120px;
  display:flex;
  align-items:center;
`

const EventImage = styled.img`
  min-width:30px;
  min-height:30px;
  max-width:30px;
  max-height:30px;
  
`

const EventItem = ({ eventData }) => {
  function checkImg(type){
    if (type === 'bike') {
      return bikeImg
    } else {
      if (type === 'Не указано') {
        return questionImg
      } else {
        if (type === 'football') {
          return footballImg
        } else {
          if (type === 'basketball') {
            return basketballImg
          } else {
            if (type === 'gamepad') {
              return gamepadImg
            } else {
              return questionImg
            }
          }
        }
      }
    }
  }
  return (
    <Container>
        <EventTitle>{eventData.title}</EventTitle>
        <DescriprionContainer>
            <EventBox>
                <EventItemBlock>
                    <EventImage src={checkImg(eventData.type)}/>
                    <EventText>{eventData.type}</EventText>               
                </EventItemBlock>
                <EventItemBlock>
                  <EventImage src={date}/>
                  <EventText>{eventData.date}</EventText>
                </EventItemBlock>
                <EventItemBlock>
                <EventImage src={user}/>
                    <EventText>{eventData.author}</EventText>
                </EventItemBlock>
                  {/*<EventText>{eventData.description}</EventText> */}
            </EventBox>
            <EventBox>
                <EventItemBlock>
                <EventImage src={mark}/>
                    <EventText>{eventData.address}</EventText>
                </EventItemBlock>
                    <EventButton>Я иду</EventButton>
              </EventBox>
        </DescriprionContainer>
    </Container>
  )
}

export default EventItem;
