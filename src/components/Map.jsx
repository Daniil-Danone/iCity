import React from 'react';
import styled from 'styled-components';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import bikeImg from '../images/bikeMark.png'
import buildingImg from '../images/buildingMark.png'
import footballImg from '../images/footballMark.png'
import basketballImg from '../images/basketballMark.png'
import gamepadImg from '../images/gamepadMark.png'



const MapWindow = styled.div`
  position: fixed;
  left: 380px;
  width: 100%;
  z-index: 0;
`


const InteractiveMap = ({ marks, onClickMap, onClickMark }) => {

  function checkImg(type){
    if (type === 'bike') {
      return bikeImg
    } else {
      if (type === 'Не указано') {
        return buildingImg
      } else {
        if (type === 'football') {
          return footballImg
        } else {
          if (type === 'basketball') {
            return basketballImg
          } else {
            if (type === 'gamepad') {
              return gamepadImg
            }
          }
        }
      }
    }
  }

  return (
    <MapWindow>
      <YMaps
      query={{
        load: "Map,Placemark,control.ZoomControl,geoObject.addon.balloon",
      }}
      >
        <div>
          <Map
            width={window.innerWidth - 380}
            height={window.innerHeight}
            defaultState={{ 
              center: [54.969470126992405, 73.41684108497125],
              zoom: 13,
            }}
            onClick={event => onClickMap(event)}
            >
            {marks.map(mark =>
              <Placemark key={mark.id}
              onClick={() => onClickMark(mark)}
              defaultGeometry={[mark.xpos, mark.ypos]}
              options={{
                iconLayout: 'default#image',
                iconImageHref: checkImg(mark.type),
                iconImageSize: [30, 30],
                preset: 'islands#circleIcon',
              }}
              properties={{ 
                balloonContentHeader: mark.title,
                balloonContentBody: mark.description,
                balloonContentFooter: 'x: ' + mark.xpos + ' y: ' + mark.ypos
              }}
              />
            )}
          </Map>
        </div>
      </YMaps>
    </MapWindow>
  )
}

export default InteractiveMap;