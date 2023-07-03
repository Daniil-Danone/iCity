import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import axios from 'axios';
import Container from '../UI/Container';
import Button from '../UI/Button';
import MarkForm from './MarkForm';

import MapCard from '../components/MapCard';
import MapCardList from './MapCardList';



const MapGrid = styled.div`
  padding: 100px 0;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
`
const MapWindow = styled.div`
  position: relative;
  display: block;
  max-width: 800px;
  max-height: 600px;
  border: 1px solid black;
`
const SideBar = styled.div`
  display: grid;
  height: 600px;
  gap: 20px;
`

const Info = styled.div`
  display: block;
  width: auto;
  left: 50%;
  top: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  text-align: center;
  z-index: 1;
  transform: translate(-50%);
`

const InteractiveMap = () => {
  const user = JSON.parse(localStorage.getItem("user"));

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
  }

  function addMark () {
    setMarkStatus('Кликните по месту, где хотите добавить объект');
  }

  function editMark (mark) {
    setEditCurrentMark(mark);
  }

  function onClickMap (e) {
    if (markStatus == 'Кликните по месту, где хотите добавить объект') {
      setMarkStatus('А теперь отредактируйте новый маркер →');
      const mark = {
        title: 'Новая метка',
        description: 'Описание',
        xpos: e.get("coords")[0],
        ypos: e.get("coords")[1],
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
  }

  useEffect(() => {
      getMarks();
      setEditCurrentMark(false);
      if (isDone) {
        setIsDone(false);
        setTimeout(() => {
          setMarkStatus(false);
        }, 1000);
      }
    }, [isDone]
  );

  return (
    <Container>
      <MapGrid>
        <MapWindow>
          {markStatus
            ? <Info>{markStatus}</Info>
            : <></>
          }
          <YMaps
          query={{
            ns: "use-load-option",
            load: "Map,Placemark,control.ZoomControl,geoObject.addon.balloon",
          }}
          >
            <div>
              <Map
              width="100%"
              defaultState={{ 
                center: [54.973272, 73.381908], 
                zoom: 13,
              }}
              onClick={onClickMap}
              height={600}
              >
                {marks.map(mark => 
                  <Placemark key={mark.id}
                    defaultGeometry={[mark.xpos, mark.ypos]} 
                    
                    options={{
                      preset: 'islands#circleIcon',
                    }
                    }
                    properties={{ 
                      balloonContentHeader: mark.title,
                      balloonContentBody: mark.description,
                      balloonContentFooter: 'x: ' + mark.xpos + ' y: ' + mark.ypos
                    }
                  }
                  />
                )}
              </Map>
            </div>
          </YMaps>
        </MapWindow>
        <SideBar>
          {editCurrentMark
          ? <></>
          :<Button onClick={addMark}>Добавить метку</Button>
          }
          {editCurrentMark
          ? <MarkForm mark={editCurrentMark} setEditCurrentMark={setEditCurrentMark} setIsDone={setIsDone} setMarkStatus={setMarkStatus}/>
          : <MapCardList marks={marks}/>
          }
        </SideBar>
      </MapGrid>
    </Container>
  )
}

export default InteractiveMap;