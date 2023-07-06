import React, { useEffect, useState } from 'react';
import EventsList from '../components/EventsList';
import Wrapper from '../UI/Wrapper';
import { styled } from 'styled-components';
import MenuBlock from '../components/MenuBlock';
import ProfileBlock from '../components/ProfileBlock';
import EventBar from '../components/EventBar';
import { useEvents } from '../hooks/useEvents';
import { useUser } from '../hooks/useUser';



const EventsPageGrig = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const EventsPage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));
  const token = localStorage.getItem("token");

  const [togoEvents, setTogoEvents] = useState([]);

  const [allEvents, setAllEvents] = useState([]) // все мероприятия
  const [selectedEvents, setSelectedEvents] = useState([]); // сортированные мероприятия

  const [currentTypes, setCurrentTypes] = useState({
    'football': false,
    'basketball': false,
    'bike': false,
    'gamepad': false
  });

  const [status, setStatus] = useState('') // статус сортировки
  const [isFormActive, setIsFormActive] = useState(false); // активна ли форма добавления мероприятия

  const getEvents = useEvents().getEvents;
  const getTogoEvents = useUser().getTogoEvents;
  const updateTogoEvents = useUser().updateTogoEvents;

  async function loadEvents() {
    const response = await getEvents();
    setSelectedEvents(response)
    setAllEvents(response)
  }

  async function loadTogoEvents() {
    const response = await getTogoEvents(token);
    setTogoEvents(response.split(', '));
  }

  async function changeStatusTogoEvent(type, eventId) {
    if (type === 'add') {
      togoEvents.push(JSON.stringify(eventId))
      const data = {
        togo_events: togoEvents.join(', ')
      }
      const response = await updateTogoEvents(token, data);
    } else {
      if (type === 'delete') {
        let filteredTogoEvents = togoEvents.filter(item => item != JSON.stringify(eventId));
        const data = {
          togo_events: filteredTogoEvents.join(', ')
        }
        const response = await updateTogoEvents(token, data);
      }
    }
    
    loadTogoEvents();
  }

  function selectEvents() {
    let sortedEvents = allEvents.filter(function(event) {
      if (event.type === "football" && currentTypes.football) {
          return true
      } else {
        if (event.type === "basketball" && currentTypes.basketball) {
          return true
        } else {
          if (event.type === "bike" && currentTypes.bike) {
            return true
          } else {
            if (event.type === "gamepad" && currentTypes.gamepad) {
              return true
            }
          }
        }
      }
    })
    if (sortedEvents.length === 0) {
      loadEvents();
      setStatus(null)
    } else {
      setStatus('Найдено результатов: ' + sortedEvents.length)
    }
    setSelectedEvents(sortedEvents)
  }

  useEffect(() => {
    loadTogoEvents();
    console.log(togoEvents);
    if (isFormActive == false) {
      if (selectedEvents.length === 0) {
        loadEvents();
      } else {
        selectEvents();
      }
    }
  }, [isFormActive, currentTypes])
  
  return (
    <Wrapper>
      <ProfileBlock user={user} setUser={setUser} isLogin={isLogin} setIsLogin={setIsLogin}/>
      <MenuBlock/>
      <EventsPageGrig>
        <EventBar 
        status={status}
        currentTypes={currentTypes}
        setCurrentTypes={setCurrentTypes}
        isLogin={isLogin}
        isFormActive={isFormActive} 
        setIsFormActive={setIsFormActive}
        />
        <EventsList togoEvents={togoEvents} changeStatusTogoEvent={changeStatusTogoEvent} events={selectedEvents}/>
      </EventsPageGrig>
    </Wrapper>
  )
}

export default EventsPage;
