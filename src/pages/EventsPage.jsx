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

  const [isChecked, setIsChecked] = useState(false);

  const [allEvents, setAllEvents] = useState([]) // все мероприятия
  const [togoEvents, setTogoEvents] = useState([]); // ID мероприятий на которые идёт пользователь
  const [likedEvents, setLikedEvents] = useState([]); // ID понравившихся пользователю мероприятий
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState([]); // отображаемые на странице мероприятия

  const [currentTypes, setCurrentTypes] = useState({
    'football': false,
    'basketball': false,
    'bike': false,
    'gamepad': false
  });

  const [status, setStatus] = useState('') // статус сортировки
  const [isFormActive, setIsFormActive] = useState(false); // активна ли форма добавления мероприятия

  const getEvents = useEvents().getEvents;
  const getUserEvents = useUser().getUserEvents;
  const updateTogoEvents = useUser().updateTogoEvents;
  const updateLikedEvents = useUser().updateLikedEvents;

  async function loadEvents() {
    const response = await getEvents();
    setVisibleEvents(response)
    setAllEvents(response)
  }

  async function loadUserEvents() {
    const response = await getUserEvents(token);
    setTogoEvents(response.togo_events.split(' '));
    setLikedEvents(response.liked_events.split(' '));
  }

  async function changeStatusTogoEvent(type, eventId) {
    if (type === 'add') {
      togoEvents.push(JSON.stringify(eventId))
      const data = {
        togo_events: togoEvents.join(' ')
      }
      await updateTogoEvents(token, data);
    } else {
      if (type === 'delete') {
        let filteredTogoEvents = togoEvents.filter(item => item != JSON.stringify(eventId));
        const data = {
          togo_events: filteredTogoEvents.join(' ')
        }
        await updateTogoEvents(token, data);
      }
    }
    
    loadUserEvents();
  }

  async function changeIsLikedStatus(type, eventId) {
    if (type === 'add') {
      likedEvents.push(JSON.stringify(eventId))
      const data = {
        liked_events: likedEvents.join(' ')
      }
      await updateLikedEvents(token, data);
    } else {
      if (type === 'delete') {
        let filteredTLikedEvents = likedEvents.filter(item => item != JSON.stringify(eventId));
        const data = {
          liked_events: filteredTLikedEvents.join(' ')
        }
        await updateLikedEvents(token, data);
      }
    }

    loadUserEvents();
  }

  function selectEvents(eventList) {
    if (currentTypes.football === false && currentTypes.basketball === false 
      && currentTypes.bike === false && currentTypes.gamepad === false) {
        console.log('1');
        setStatus('');
        setVisibleEvents(eventList);
    } else {
      let sortedEvents = eventList.filter(event => {
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
        setStatus('Нет результатов');
        setVisibleEvents([]);
      } else {
        setVisibleEvents(sortedEvents);
        setStatus('Найдено результатов: ' + sortedEvents.length)
      }
    }
  }

  function selectLiked() {
    if (isChecked) {
      let sortedEvents = allEvents.filter(event => {
        const isLiked = likedEvents.indexOf(JSON.stringify(event.id)) != -1;
        return isLiked
      });
      selectEvents(sortedEvents);
    } else {
      selectEvents(allEvents);
    }
  }

  useEffect(() => {
    loadUserEvents();
    if (allEvents.length === 0) {
      loadEvents();
    }
    if (isFormActive === false) {
      selectLiked();
    }
  }, [isFormActive, currentTypes, isChecked])
  
  return (
    <Wrapper>
      <ProfileBlock user={user} setUser={setUser} isLogin={isLogin} setIsLogin={setIsLogin}/>
      <MenuBlock/>
      <EventsPageGrig>
        <EventBar 
        selectLiked={selectLiked}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        status={status}
        currentTypes={currentTypes}
        setCurrentTypes={setCurrentTypes}
        isLogin={isLogin}
        isFormActive={isFormActive} 
        setIsFormActive={setIsFormActive}
        />
        <EventsList 
          likedEvents={likedEvents} 
          togoEvents={togoEvents}
          changeIsLikedStatus={changeIsLikedStatus}
          changeStatusTogoEvent={changeStatusTogoEvent} 
          events={visibleEvents}
        />
      </EventsPageGrig>
    </Wrapper>
  )
}

export default EventsPage;
