import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import axios from 'axios';
import Container from '../UI/Container';

import MapCard from '../components/MapCard';

const MapGrid = styled.div`
  padding: 100px 0;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
`
const MapWindow = styled.div`
  display: block;
  max-width: 800px;
  max-height: 600px;
  border: 1px solid black;
`
const Categories = styled.div`
  display: grid;
  grid-auto-rows: auto;
  gap: 10px;
  font-family: Monserrat, sans-serif;
`

const InteractiveMap = () => {
  const [marks, setMarks] = useState([
    {'title': 'Дом Эмиля', 'description': 'Дом ге(ни)я', 'xpos': 54.950474, 'ypos': '73.3897'}
  ]);

  const [currentMark, setCurrentMark] = useState('');

  const url = 'http://127.0.0.1:8000/api/v1/mark';


  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setMarks(response.data)
      })
    }, []
  );

  return (
    <Container>
      <MapGrid>
        <MapWindow>
          <YMaps
          query={{
            ns: "use-load-option",
            load: "Map,Placemark,control.ZoomControl,geoObject.addon.balloon",
          }}
          >
            <div>
              <Map
              width='100%'
              defaultState={{ 
                center: [54.973272, 73.381908], 
                zoom: 13,
                controls: ["zoomControl"]
              }}
              height={600}
                modules={["control.ZoomControl"]}
              >
                {marks.map(mark => 
                  <Placemark key={mark.id}
                    defaultGeometry={[mark.xpos, mark.ypos]} 
                    options={{
                    }
                    }
                    properties={{
                      balloonContentHeader: mark.title + ' (ID: ' + mark.id + ')',
                      balloonContentBody: mark.description,
                      balloonContentFooter: mark.xpos + ' ' + mark.ypos
                    }
                  }
                  />
                )}
              </Map>
            </div>
          </YMaps>
        </MapWindow>
        <Categories>
          {marks.map(mark => 
            <MapCard mark={mark}/>
          )}
        </Categories>
      </MapGrid>
    </Container>
  )
}

export default InteractiveMap;