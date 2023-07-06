import React from 'react';
import styled from 'styled-components';
import date from '../images/dateIcon.png'
import userImg from '../images/userIcon.png'
import mark from '../images/markIcon.png'
import time from '../images/timeIcon.png'
import gamepadImg from '../images/gamepadIcon.png';
import footballImg from '../images/footballIcon.png';
import basketballImg from '../images/basketballIcon.png';
import bikeImg from '../images/bikeIcon.png';
import questionImg from '../images/questionIcon.png';
import heartFilled from '../images/heartFilled.png'
import heartBordered from '../images/heartBordered.png';
import trash from '../images/trash.png';
import { useEvents } from '../hooks/useEvents';



const Container = styled.div`
  position: relative;
  width: 300px;
  height: auto;
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
const EventTitle = styled.div`
  text-align: center;
  padding: 0 30px;
  float: top;
  width: 100%;
  color: #4B4B4B;
  font-size: 18px;
  font-style: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 20px;
  box-sizing: border-box;
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
  cursor: pointer;
  padding: 5px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: orange;
    color: white;
  }
`

const Status = styled.div`
  color: #2185fb;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
`

const EventDelete = styled.button`
  font-size: 13px;
  background: none;
  color: #595959;
  border: none;
  cursor: pointer;
  text-decoration: underline;l
  transition: 0.2s ease-in-out;

  &:hover {
    color: red;
  }
`

const EventItemBlock = styled.div`
  width:120px;
  display:flex;
  align-items:center;
`

const EventLiked = styled.div`
  position: absolute;
  right: 5px;
`

const Trash = styled.img`
  position: absolute;
  right: 5px;
  min-width:30px;
  min-height:30px;
  max-width:30px;
  max-height:30px;
  cursor: pointer;
  top: 40px;
`

const EventImage = styled.img`
  min-width:30px;
  min-height:30px;
  max-width:30px;
  max-height:30px;
  cursor: pointer;
`

const EventItem = ({ user, eventData, togoEvents, likedEvents, changeStatusTogoEvent, changeIsLikedStatus }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isLogin = localStorage.getItem("isLogin");
  const amIGoing = togoEvents.indexOf(JSON.stringify(eventData.id)) != -1;
  const isLiked = likedEvents.indexOf(JSON.stringify(eventData.id)) != -1;

  const deleteEvent = useEvents().deleteEvent;

  async function delEvent() {
    await deleteEvent(eventData.id)
    location.reload();
  }

  // const user = users.find(user => user.id === eventData.author)
  
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
  function checkType(type){
    if (type === 'bike') {
      return 'Велоспорт'
    } else {
      if (type === 'Не указано') {
        return 'Не указано'
      } else {
        if (type === 'football') {
          return 'Футбол'
        } else {
          if (type === 'basketball') {
            return 'Баскетбол'
          } else {
            if (type === 'gamepad') {
              return 'Игры'
            } else {
              return 'Не указано'
            }
          }
        }
      }
    }
  }

  return (
    <Container>
        <EventTitle>{eventData.title}</EventTitle>
        <EventLiked>
          {isLiked ? isLogin && <EventImage onClick={() => changeIsLikedStatus('delete', eventData.id)} src={heartFilled}/> : isLogin && <EventImage onClick={() => changeIsLikedStatus('add', eventData.id)} src={heartBordered}/>}
        </EventLiked>
        {currentUser.id === eventData.author && <Trash src={trash} onClick={() => delEvent()}/>}
        <DescriprionContainer>
            <EventBox>
                <EventItemBlock>
                    <EventImage src={checkImg(eventData.type)}/>
                    <EventText>{checkType(eventData.type)}</EventText>               
                </EventItemBlock>
                <EventItemBlock>
                  <EventImage src={date}/>
                  <EventText>{eventData.date}</EventText>
                </EventItemBlock>
                <EventItemBlock>
                  <EventImage src={time}/>
                  <EventText>{eventData.time}</EventText>
                </EventItemBlock>
                  {/*<EventText>{eventData.description}</EventText> */}
            </EventBox>
            <EventBox>
              <EventItemBlock>
                <EventImage src={userImg}/>
                <EventText>{user[0].name}</EventText>
              </EventItemBlock>
              <EventItemBlock>
                <EventImage src={mark}/>
                <EventText>{eventData.address}</EventText>
              </EventItemBlock>
            </EventBox>
        </DescriprionContainer>
        {amIGoing && isLogin && <Status>Уже иду</Status>}
        {amIGoing ? isLogin && <EventDelete onClick={() => changeStatusTogoEvent('delete', eventData.id)}>Отменить участие</EventDelete> : <EventButton onClick={() => changeStatusTogoEvent('add', eventData.id)}>Я пойду</EventButton>}
    </Container>
  )
}

export default EventItem;
