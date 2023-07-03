import React, { useState, useEffect} from 'react';
import InteractiveMap from '../components/Map';
import styled from 'styled-components';
import Wrapper from '../UI/Wrapper';
import MapBar from '../components/MapBar';
import ProfileBlock from '../components/ProfileBlock';
import ProfilePopup from '../components/ProfilePopup';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components'
import MenuBlock from '../components/MenuBlock';


const GlobalStyle = createGlobalStyle`
  body {
    font-family: Montserrat, sans-serif;
  }
`;


const MapPageGrid = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`


const MapPage = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));
    
    const [marks, setMarks] = useState([]);
    const [markStatus, setMarkStatus] = useState('');
    const [editCurrentMark, setEditCurrentMark] = useState(false);
    const [isDone, setIsDone] = useState(false);
    
    const url = 'http://127.0.0.1:8000/api/v1/mark';

    function getMarks () {
        axios
        .get(url)
        .then(response => {
            setMarks(response.data)
        })
    };

    function addMark () {
        if (isLogin) {
          setMarkStatus('Кликните по месту, где хотите добавить объект');
        } else {
          setMarkStatus('Чтобы добавлять метки, нужно войти в аккаунт');
          setIsDone(true);
        }       
    };

    function editMark (mark) {
        setEditCurrentMark(mark);
    };

    function onClickMap (event) {
        if (markStatus == 'Кликните по месту, где хотите добавить объект') {
        setMarkStatus('А теперь отредактируйте новый маркер →');
        const mark = {
            title: 'Новая метка',
            description: 'Описание',
            xpos: event.get("coords")[0],
            ypos: event.get("coords")[1],
            author: user.id
        };
    
        axios
            .post(url, mark)
            .then(response => {
            console.log(response);
            if (response.status === 200) {
                console.log(response.data)
                getMarks();
                editMark(response.data);
            }
            });
        };
    };

    useEffect(() => {
        getMarks();
        setEditCurrentMark(false);
        if (isDone) {
            setIsDone(false);
            setTimeout(() => {
            setMarkStatus(false);
            }, 1000);
        };
        setInterval(() => {
          {isLogin != localStorage.getItem("isLogin")
          && setIsLogin(localStorage.getItem("isLogin"))
        }
        }, 500);
        }, [isDone]
    );
  
  return (
    <Wrapper>
      <GlobalStyle/>
      <MapPageGrid>
        <MenuBlock/>
        <ProfileBlock/>
        <MapBar isLogin={isLogin} marks={marks} markStatus={markStatus} editCurrentMark={editCurrentMark} setEditCurrentMark={setEditCurrentMark} addMark={addMark} setIsDone={setIsDone} setMarkStatus={setMarkStatus}/>
        <InteractiveMap marks={marks} onClick={onClickMap}/>
      </MapPageGrid>
    </Wrapper>
  )
}

export default MapPage;
