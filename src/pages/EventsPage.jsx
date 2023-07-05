import React, { useEffect, useState } from 'react';
import EventsList from '../components/EventsList';
import Wrapper from '../UI/Wrapper';
import { styled } from 'styled-components';
import MenuBlock from '../components/MenuBlock';
import ProfileBlock from '../components/ProfileBlock';
import EventBar from '../components/EventBar';
import { useEvents } from '../hooks/useEvents';



const EventsPageGrig = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const EventsPage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));

  const [allEvents, setAllEvents] = useState([])

  const [selectedEvents, setSelectedEvents] = useState([]);

  const [currentTypes, setCurrentTypes] = useState({
    'football': false,
    'basketball': false,
    'bike': false,
    'gamepad': false
  });

  const [status, setStatus] = useState(' ')

  const [isFormActive, setIsFormActive] = useState(false);

  const getEvents = useEvents().getEvents;

  async function loadEvents() {
    const response = await getEvents();
    setSelectedEvents(response)
    setAllEvents(response)
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
        <EventsList events={selectedEvents}/>
      </EventsPageGrig>
    </Wrapper>
  )
}

export default EventsPage;
