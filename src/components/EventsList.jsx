import React, {useState, useEffect} from 'react';
import axios from 'axios';
import EventItem from './EventItem';
import { styled } from 'styled-components';
import EventForm from './EventForm';
import Button from '../UI/Button';

const EventsListGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 20px 0;
    gap: 10px;
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
        <Button onClick={eventPopup}>Добавить мероприятие</Button>
        <EventsListGrid>
            {events.map(event =>
            <EventItem event={event} key={event.id}/>)}
        </EventsListGrid>
    </>
    
  )
}

export default EventsList;
