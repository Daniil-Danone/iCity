import React from 'react';
import styled from 'styled-components';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';



const MapWindow = styled.div`
  position: fixed;
  left: 380px;
  width: 100%;
  z-index: 0;
`


const InteractiveMap = ({ marks, onClickMap }) => {
  return (
    <MapWindow>
      <YMaps
      query={{
        ns: "use-load-option",
        load: "Map,Placemark,control.ZoomControl,geoObject.addon.balloon",
      }}
      >
        <div>
          <Map
            width={window.innerWidth - 380}
            height={window.innerHeight}
            defaultState={{ 
              center: [54.973272, 73.381908],
              zoom: 13,
            }}
            onClick={event => onClickMap(event)}
            >
            {marks.map(mark => 
              <Placemark key={mark.id}
              defaultGeometry={[mark.xpos, mark.ypos]}
              options={{
                preset: 'islands#circleIcon',
              }}
              properties={{ 
                balloonContentHeader: mark.title + mark.type,
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