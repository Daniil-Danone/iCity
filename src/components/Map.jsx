import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import axios from 'axios'

const Container = styled.div`
  display: grid;
  margin: 100px auto;
  max-width: calc(100% - 500px);
  grid-template-columns: 3fr 1fr;
  gap: 40px;
  justify-content: space-between;
`
const MapWindow = styled.div`
  display: block;
  max-width: 100%;
  border: 4px solid orange;
  border-radius: 5px;
`
const Categories = styled.div`
  display: block;
  width: 100%;
  border: 4px solid orange;
  border-radius: 5px;
  font-family: Monserrat, sans-serif;
`

const InteractiveMap = () => {
  const [marks, setMarks] = useState([
    {'title': 'Дом Эмиля', 'description': 'Дом ге(ни)я', 'xpos': 54.950474, 'ypos': '73.3897'}
  ])

  const url = 'http://127.0.0.1:8000/api/v1/mark'

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setMarks(response.data)
      })
    }, []
  )

  return (
    <Container>
      <MapWindow>
        <YMaps
        query={{
          ns: "use-load-option",
          load: "Map,Placemark,control.ZoomControl,geoObject.addon.balloon",
        }}
        >
          <Map
          width='1000'
          defaultState={{ 
            center: [54.989203, 73.372272], 
            zoom: 9,
            controls: ["zoomControl"]
          }}
          height={600}
            modules={["control.ZoomControl"]}
          >
            {marks.map(mark => 
              <Placemark key={mark.id}
                defaultGeometry={[mark.xpos, mark.ypos]} 
                properties={{
                  balloonContentBody: mark.title + ': ' + mark.description
                }
              }
              />
            )}
          </Map>
        </YMaps>
      </MapWindow>

      <Categories>
        <ul>
          <li>Велоспорт</li>
          <li>Футбол</li>
          <li>Баскетбол</li>
          <li>Хоккей</li>
          <li>Киберспорт</li>
        </ul>
      </Categories>
    </Container>
  )
}

export default InteractiveMap
