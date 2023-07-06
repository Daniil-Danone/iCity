import React, { useEffect } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';


const EventMap = ( { isMark, onClickMap, title, type, description, date, time, address, xpos, ypos } ) => {
    useEffect(() => {}, [isMark])
    return (
        <YMaps
            query={{
                load: "Map,Placemark,control.ZoomControl,geoObject.addon.balloon",
            }}
            >
            <div>
                <Map
                    width={320}
                    height={200}
                    defaultState={{ 
                    center: [54.969470126992405, 73.41684108497125],
                    zoom: 13,
                    }}
                    onClick={event => onClickMap(event)}
                    >
                    {isMark && 
                        <Placemark
                            defaultGeometry={[xpos, ypos]}
                            options={{
                                preset: 'islands#circleIcon',
                                iconColor: '#2185fb',
                            }}

                            properties={{ 
                                balloonContentHeader: title + '<div><small>' + type + '</small></div>',
                                balloonContentBody: description,
                                balloonContentFooter: '<div><small>Дата: ' + 
                                date + '</small></div><div><small>Время: ' + 
                                time + '</small></div>' + 
                                address
                            }}
                        />
                    }
                </Map>
            </div>
        </YMaps>
    )
}

export default EventMap
