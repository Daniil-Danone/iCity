import React from 'react';
import EventItem from './EventItem';
import styled from 'styled-components';


const StyledUserWrapperEventList = styled.div`
  height: 100%;
  box-sizing: border-box;

`

const StyledUserEventList = styled.div`
  display: grid;
  padding: 20px;
  padding-right: 5px;
  box-sizing: border-box;
  border-collapse: collapse;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 205px;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 20px;
  
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 4px;
    background-color: #dedede;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #2185fb;
    border-radius: 9em;
  }
`

const UserEventsList = ({ users, events, togoEvents, likedEvents, changeStatusTogoEvent, changeIsLikedStatus }) => {
  return (
    <StyledUserWrapperEventList>
      <StyledUserEventList>
          {events.map(eventData => 
            <EventItem 
              user={users.filter(user => user.id === eventData.author)}
              changeIsLikedStatus={changeIsLikedStatus} 
              changeStatusTogoEvent={changeStatusTogoEvent} 
              togoEvents={togoEvents} 
              likedEvents={likedEvents} 
              eventData={eventData} 
              key={eventData.id}
            />
            )
          }
      </StyledUserEventList>
    </StyledUserWrapperEventList>
  )
}

export default UserEventsList;
