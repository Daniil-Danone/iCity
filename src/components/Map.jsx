import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import axios from 'axios'
import avatar from '../images/avatar.jpg'
import Button from '../UI/Button'
import MapCard from '../components/MapCard'

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
  border: 1px solid black;
`
const Categories = styled.div`
  display: grid;
  grid-auto-rows: 150px;
  gap: 10px;
  width: 100%;
  font-family: Monserrat, sans-serif;
`

const InteractiveMap = () => {
  const [marks, setMarks] = useState([
    {'title': 'Дом Эмиля', 'description': 'Дом ге(ни)я', 'xpos': 54.950474, 'ypos': '73.3897'}
  ])

  const [currentMark, setCurrentMark] = useState('');

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
    </Container>
  )
}

export default InteractiveMap
