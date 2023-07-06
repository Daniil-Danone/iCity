import Wrapper from '../UI/Wrapper'
import ProfileInfoUser from '../components/ProfileInfoUser'
import MenuBlock from '../components/MenuBlock'
import styled from 'styled-components';
import BusinessCard from '../components/BusinessCard'
import React, {useState, useEffect} from 'react';
import UserEventsList from '../components/UserEventsList';
import { useUser } from '../hooks/useUser';
import { useEvents } from '../hooks/useEvents'
import Link from '../UI/Link'
import ProfileBlock from '../components/ProfileBlock'


const StyledWrapper = styled.div`
  font-family: Montserrat, sans-serif;
  height: 100%;
  width: 100%;
  position: relative;
`

const StyledWrapperEventList = styled.div`
  box-sizing: border-box;
  padding: 0 100px;
`

const Logo = styled.a`
    color: #2185fb;
    font-size: 26px;
    line-height: 50px;
    font-size: 50px;
    padding-bottom: 20px;
    border-bottom: 4px solid #2185fb;
    transition: 0.2s ease;
    text-decoration:none;
    border-bottom:none

`

const Settings = styled.button`
  position: absolute;
  top:7px;
  right:7px;
  border-radius: 30px;
  background: linear-gradient(167deg, #FFC5B9 0%, #FF8F78 100%);
  padding:10px;
`

const ProfilePageGrid = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  position: relative;
  display: grid;
  padding: 50px 300px;
  gap: 40px;
  box-sizing: border-box;
  grid-template-columns: 540px auto;
  grid-template-areas: 
      "usercard events"
      "info events"
      "info events"
`

const ProfileMeets = styled.div`
  min-width: 100%;
  height: 100%;
  position: absolute;
  grid-area: events;
  border: 2px gray solid;
  border-radius:20px;
`

const ProfileMeetsTitle = styled.h2`
  color: #000;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  margin:0 auto;
  margin-top:25px;
  margin-bottom:25px;
`

const MeetsContainer = styled.div`
  width: 100%;
  display: grid;
  
`

const ProfilePage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // объект пользователя
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin")); // залогинен ли пользователь
  const token = localStorage.getItem("token"); // токен пользователя

  const [users, setUsers] = useState([]); // пользователи (для ссылок на них с мероприятий)
  
  const [allEvents, setAllEvents] = useState([]); // все мероприятия
  const [togoEvents, setTogoEvents] = useState([]); // ID мероприятий на которые идёт пользователь
  const [likedEvents, setLikedEvents] = useState([]); // ID понравившихся пользователю мероприятий
  const [visibleEvents, setVisibleEvents] = useState([]); // мероприятия пользователя

  const [isFormActive, setIsFormActive] = useState(false); // активна ли форма добавления мероприятия

  const [popupTitle, setPopupTitle] = useState('Создание мероприятия');
  
  
  const getUsers = useUser().getUsers; // функция возврата пользователей из БД
  const getEvents = useEvents().getEvents; // функция возврата мероприятий из БД
  const getUserEvents = useUser().getUserEvents; // функция возврата мероприятий пользователя из БД
  const updateTogoEvents = useUser().updateTogoEvents; // функция обновления мероприятий, на которы зареган пользователь
  const updateLikedEvents = useUser().updateLikedEvents; // функция обновления лайкнутых мероприятий пользователя

  // выгрузка основных данных из БД (мероприятия и пользователи)
  async function loadData() {
    const events = await getEvents();
    const users = await getUsers();
    setAllEvents(events);
    setUsers(users);
  }

  // выгрузка данных пользователя из БД и обновление стейта зареганных и лайкнутых мероприятий
  async function loadUserEvents() {
    if (isLogin) {
      const response = await getUserEvents(token);
      setTogoEvents(response.togo_events.split(' '));
      setLikedEvents(response.liked_events.split(' '));
    }
  }

  // фильтрация мероприятий и их склеивание для отображения тех, что связаны с пользователем
  async function showEvents(){
    const userEvents = allEvents.filter(event => togoEvents.indexOf(JSON.stringify(event.id)) != -1 || likedEvents.indexOf(JSON.stringify(event.id)) != -1);
    setVisibleEvents(userEvents);
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

  useEffect(() => {
    showEvents();
    if (allEvents.length === 0) {
      loadData();
    }
    if (visibleEvents.length === 0) {
      loadUserEvents();
      showEvents();
    }
  }, [user, isLogin, togoEvents]);

  return (
    <Wrapper>
      <Logo href='/'><Link>iCity</Link></Logo>
      <MenuBlock/>
      <ProfileBlock user={user} setUser={setUser} isLogin={isLogin} setIsLogin={setIsLogin}/>
      <StyledWrapper>
        <ProfilePageGrid>
          <BusinessCard user={user}/>
          <ProfileInfoUser/>
          <ProfileMeets>
            <MeetsContainer>
            <ProfileMeetsTitle>Встречи пользователя</ProfileMeetsTitle>
                <StyledWrapperEventList>
                    <UserEventsList 
                      users={users}
                      likedEvents={likedEvents} 
                      togoEvents={togoEvents}
                      changeIsLikedStatus={changeIsLikedStatus}
                      changeStatusTogoEvent={changeStatusTogoEvent} 
                      events={visibleEvents}
                    />
                </StyledWrapperEventList>
            </MeetsContainer>
          </ProfileMeets>
        </ProfilePageGrid>
      </StyledWrapper>
    </Wrapper>
  )
}

export default ProfilePage
