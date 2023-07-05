import React, {useState, useEffect} from 'react';
import axios from 'axios';
import EventItem from './EventItem';
import styled from 'styled-components';
import EventForm from './EventForm';
import Button from '../UI/Button';

const StyledWrapperEventList = styled.div`
    padding: 100px 300px 100px 100px;
`

const StyledEventList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    overflow-x: auto;
    gap: 20px;
`

const EventsList = () => {
    const [active, setActive] = useState(false);
    const [events, setEvents] = useState([]);
    const [popupTitle, setPopupTitle] = useState('Создание мероприятия')
    
    const url = 'http://127.0.0.1:8000/api/v1/event';

    function eventPopup () {
        setActive(true)
    }

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                console.log(response.data);
                setEvents(response.data);
            });
    }, []);

  return (
    <>
    <EventForm active={active} setActive={setActive} popupTitle={popupTitle}/>
    <StyledWrapperEventList>
        <StyledEventList>
            {events.map(event =>
            <EventItem event={event} key={event.id}/>)}
        </StyledEventList>
    </StyledWrapperEventList>
    </>
  )
}

export default EventsList;
