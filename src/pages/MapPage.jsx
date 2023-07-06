import React, { useState, useEffect} from 'react';
import InteractiveMap from '../components/Map';
import styled from 'styled-components';
import Wrapper from '../UI/Wrapper';
import MapBar from '../components/MapBar';
import ProfileBlock from '../components/ProfileBlock';
import MenuBlock from '../components/MenuBlock';
import { useMarks } from '../hooks/useMarks';


const MapPageGrid = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`


const MapPage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));

  const [marks, setMarks] = useState([]); // все метки
  const [isEditingMark, setIsEditingMark] = useState(false); // идёт ли редактирование текущей метки
  const [isEditingDone, setIsEditingDone] = useState(false); // завершено ли редактирование текущей метки
  const [currentMark, setCurrentMark] = useState(null); // данные выбранной метки

  const [infoPopupActive, setInfoPopupActive] = useState(false);// открыта ли подсказка
  const [popupText, setPopupText] = useState(null); // текст подсказки
  
  const getMarks = useMarks().getMarks // Фунция (API-POST-запрос для загрузки меток)
  const addMark = useMarks().addMark // Фунция (API-POST-запрос для добавления метки)

  async function loadMarks() {
      const response = await getMarks();
      setMarks(response)
  }
  
  async function onClickMap(event) {
    if(popupText === 'Кликните по месту, где хотите добавить объект') {
      setPopupText('А теперь отредактируйте новый маркер →')
        const markData = {
            title: 'Новая метка',
            description: 'Описание',
            xpos: event.get("coords")[0],
            ypos: event.get("coords")[1],
            author: user.id
        };
        const response = await addMark(markData);
        if (response) {
          setCurrentMark(response); 
          setIsEditingMark(true);
        } 
        } else {
          setIsEditingDone(true);
          setCurrentMark(null); 
          setIsEditingMark(false);
        }
  }

  async function onClickMark(mark) {
    console.log(mark);
    console.log(currentMark);
    setCurrentMark(null)
    setIsEditingMark(true);
    setTimeout(() => {
        setCurrentMark(mark)
      }, 10);
  }

  useEffect(() => {
    loadMarks();
    if (isEditingDone) {
      setIsEditingDone(false);
      setIsEditingMark(false);
      setCurrentMark(null);
      setPopupText(null);
      setInfoPopupActive(false)
    }
  }, [isEditingDone, popupText, isLogin, user])

  return (
    <Wrapper>
      <MenuBlock/>
      <ProfileBlock user={user} setUser={setUser} isLogin={isLogin} setIsLogin={setIsLogin}/>
      <MapPageGrid>
        <MapBar 
          isLogin={isLogin}
          marks={marks}
          popupText={popupText}
          setPopupText={setPopupText}
          isEditingMark={isEditingMark}
          currentMark={currentMark}
          setCurrentMark={setCurrentMark}
          isEditingDone={isEditingDone}
          setIsEditingDone={setIsEditingDone}
          infoPopupActive={infoPopupActive}
          setInfoPopupActive={setInfoPopupActive}
        />
        <InteractiveMap marks={marks} onClickMap={onClickMap} onClickMark={onClickMark}/>
      </MapPageGrid>
    </Wrapper>
  )
}

export default MapPage;
