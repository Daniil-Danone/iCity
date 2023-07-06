import React, { useEffect, useState } from 'react';
import EventsList from '../components/EventsList';
import Wrapper from '../UI/Wrapper';
import { styled } from 'styled-components';
import MenuBlock from '../components/MenuBlock';
import ProfileBlock from '../components/ProfileBlock';
import EventBar from '../components/EventBar';
import { useEvents } from '../hooks/useEvents';
import { useUser } from '../hooks/useUser';
import InfoPopup from '../UI/InfoPopup';



const EventsPageGrig = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const EventsPage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);

  const [isEditingDone, setIsEditingDone] = useState(false);

  const [isChecked, setIsChecked] = useState(false); // отмечены ли "понравившиеся"

  const [infoPopupMsg, setInfoPopupMsg] = useState(null); // сообщение в попапе
  const [isActive, setIsActive] = useState(false); // открыт ли попап

  const [allEvents, setAllEvents] = useState([]) // все мероприятия
  const [togoEvents, setTogoEvents] = useState([]); // ID мероприятий на которые идёт пользователь
  const [likedEvents, setLikedEvents] = useState([]); // ID понравившихся пользователю мероприятий
  const [visibleEvents, setVisibleEvents] = useState([]); // отображаемые на странице мероприятия

  // выбор типа мероприятия
  const [currentTypes, setCurrentTypes] = useState({
    'football': false,
    'basketball': false,
    'bike': false,
    'gamepad': false
  });

  const [status, setStatus] = useState('') // статус сортировки
  const [isFormActive, setIsFormActive] = useState(false); // активна ли форма добавления мероприятия

  const getUsers = useUser().getUsers;
  const getEvents = useEvents().getEvents;
  const getUserEvents = useUser().getUserEvents;
  const updateTogoEvents = useUser().updateTogoEvents;
  const updateLikedEvents = useUser().updateLikedEvents;

  async function loadData() {
    setInfoPopupMsg('Загрузка...');
    setIsActive(true);
    const events = await getEvents();
    const users = await getUsers();
    setVisibleEvents(events);
    setAllEvents(events);
    setUsers(users);
    setInfoPopupMsg('');
    setIsActive(false);
  }

  async function loadUserEvents() {
    if (isLogin) {
      const response = await getUserEvents(token);
      setTogoEvents(response.togo_events.split(' '));
      setLikedEvents(response.liked_events.split(' '));
    }
  }

  async function changeStatusTogoEvent(type, eventId) {
    if (isLogin) {
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
    } else {
      setInfoPopupMsg('Чтобы записаться на мероприятие нужно войти в систему');
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
      }, 2000);
    }
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
      if (sortedEvents.length === 0) {
        setStatus('Нет результатов');
      } else {
        setStatus('Найдено результатов: ' + sortedEvents.length)
      }
      selectEvents(sortedEvents);
    } else {
      setStatus('')
      selectEvents(allEvents);
    }
  }

  useEffect(() => {
    loadUserEvents();
    if (allEvents.length === 0 || isEditingDone) {
      setIsEditingDone(false);
      loadData();
    }
    if (isFormActive === false) {
      selectLiked();
    }
  }, [user, isLogin, isActive, isEditingDone, isFormActive, currentTypes, isChecked])
  
  return (
    <Wrapper>
      <InfoPopup active={isActive}>{infoPopupMsg}</InfoPopup>
      <ProfileBlock user={user} setUser={setUser} isLogin={isLogin} setIsLogin={setIsLogin}/>
      <MenuBlock/>
      <EventsPageGrig>
        <EventBar 
        setIsEditingDone={setIsEditingDone}
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
          users={users}
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
