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

const EventItem = ({ event }) => {
  return (
    <Container>
        <div>
            <h2>{event.title}</h2>
            <small>{event.type}</small>
            <p>{event.description}</p>
        </div>
        <div>
            <p>{event.date}</p>
            <p>{event.address}</p>
            <p>{event.author}</p>
        </div>
    </Container>
  )
}

export default EventItem;
