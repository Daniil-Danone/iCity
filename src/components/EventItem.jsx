import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  border: 2px #2185fb solid;
  border-radius: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const EventItem = ({ eventData }) => {
  return (
    <Container>
        <div>
            <h2>{eventData.title}</h2>
            <small>{eventData.type}</small>
            <p>{eventData.description}</p>
        </div>
        <div>
            <p>{eventData.date}</p>
            <p>{eventData.address}</p>
            <p>{eventData.author}</p>
        </div>
    </Container>
  )
}

export default EventItem;
