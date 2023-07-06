import Wrapper from '../UI/Wrapper'
import ProfileInfoUser from '../components/ProfileInfoUser'
import MenuBlock from '../components/MenuBlock'
import styled from 'styled-components';
import BusinessCard from '../components/BusinessCard'
import React, {useState, useEffect} from 'react';
import EventsList from '../components/EventsList';
import EventItem from '../components/EventItem';
import EventForm from '../components/EventForm';
import { useUser } from '../hooks/useUser';
import { useEvents } from '../hooks/useEvents'


const StyledWrapperEventList = styled.div`
  padding: 0px 100px 0px 100px;
  
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
  position:absolute;
  top:7px;
  right:7px;
  border-radius: 30px;
  background: linear-gradient(167deg, #FFC5B9 0%, #FF8F78 100%);
  padding:10px;
`

const ProfileContainer = styled.div`
  margin: 40px 120px 40px 120px;
  display:flex;

`

const ProfileMeets = styled.div`
  display:flex;
  flex-direction:column;
  border: 2px gray solid;
  border-radius:20px;
  margin-left: 40px;
`

const ProfileMeetsTitle = styled.h2`
  color: #000;
  font-family: Montserrat Alternates;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  margin:0 auto;
  margin-top:25px;
  margin-bottom:25px;
`

const MeetsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow-y: auto;
`

const LeftBlock = styled.div`

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

  const [isUpdatingDone, setIsUpdatingDone] = useState(false); // завершено ли обновление мероприятий
  
  
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
      setIsUpdatingDone(true);
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
      setIsUpdatingDone(true);
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
    setIsUpdatingDone(true);
  }

  useEffect(() => {
    isUpdatingDone && showEvents(); setIsUpdatingDone(false);
    if (allEvents.length === 0) {
      loadData();
    }
    if (visibleEvents.length === 0) {
      loadUserEvents();
      showEvents();
    }
  }, [user, isLogin, isUpdatingDone]);

  return (
    <Wrapper>
      <Logo href='/'>iCity</Logo>
      <MenuBlock></MenuBlock>
      <Settings>Settings</Settings>
      <ProfileContainer>
        <LeftBlock>
          <BusinessCard user={user}/>
          <ProfileInfoUser/>
        </LeftBlock>

        <ProfileMeets>
          <ProfileMeetsTitle>Встречи пользователя</ProfileMeetsTitle>
            <MeetsContainer>
                  {isFormActive && <EventForm active={isFormActive} setActive={setIsFormActive} popupTitle={popupTitle}/>}
                <StyledWrapperEventList>
                    <EventsList 
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
      </ProfileContainer>
    </Wrapper>
  )
}

export default ProfilePage
