import React, { useEffect, useState } from 'react'
import Title from '../UI/Title';
import Input from '../UI/Input';
import Types from '../UI/Types';
import Button from '../UI/Button';
import Form from '../UI/Form';
import Reset from '../UI/Reset';
import ChooseBox from '../UI/ChooseBox';
import NegativeButton from '../UI/NegativeButton';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import styled from 'styled-components';

import gamepadImg from '../images/gamepad.png';
import footballImg from '../images/football.png';
import basketballImg from '../images/basketball.png';
import bikeImg from '../images/bike.png';
import { useEvents } from '../hooks/useEvents';

const MapWindow = styled.div`
  position: relative;
  border: 1px solid #2185fb;
  width: 100%;
  z-index: 1;
  margin-bottom: 20px;
`


const EventForm = ({ setIsEditingDone, setIsFormActive, popupTitle }) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Не указано');
    const [date, setDate] = useState('Не указано');
    const [time, setTime] = useState('Не указано');
    const [address, setAddress] = useState('Омск');
    const [xpos, setXPos] = useState('');
    const [ypos, setYPos] = useState('');

    const [isMark, setIsMark] = useState()

    const addEvent = useEvents().addEvent;
    
    const [isTypeSelected, setIsTypeSelected] = useState({
        'football': false,
        'basketball': false,
        'bike': false,
        'gamepad': false
    });

    function onClickMap(event) {
        setXPos(event.get("coords")[0]);
        setYPos(event.get("coords")[1]);
        setIsMark(true);
    }

    function changeState(event) {
        if (event.currentTarget.id === type) {
            setType('Не указано')
            setIsTypeSelected({
                'football': false,
                'basketball': false,
                'bike': false,
                'gamepad': false
            })
        } else {
            const type = event.currentTarget.id
            setIsTypeSelected({
                'football': type === 'football' ? true : false,
                'basketball': type === 'basketball' ? true : false,
                'bike': type === 'bike' ? true : false,
                'gamepad': type === 'gamepad' ? true : false
            });
            setType(type);
        }
    }

    async function submitForm (event) {
        event.preventDefault();
        const eventData = {
            title: title,
            description: description,
            type: type,
            date: date,
            time: time,
            address: address,
            xpos: xpos,
            ypos: ypos,
            author: user.id
        };

        const response = await addEvent(eventData)
        if (response) {
            setIsFormActive(false);
            setIsEditingDone(true);
        }
    };

    useEffect(() => {}, [isMark, xpos, ypos])

    return (
        <Form>
            <Title>{popupTitle}</Title>
            <form onSubmit={submitForm}>
                <Input type='text'placeholder='Заголовок' value={title} onChange={event => setTitle(event.target.value)} required />
                <Input type='text'placeholder='Описание' value={description} onChange={event => setDescription(event.target.value)}/>
                <Types>
                    <ChooseBox typeSelected={isTypeSelected.football} src={footballImg} onClick={event => changeState(event)} id='football'></ChooseBox>
                    <ChooseBox typeSelected={isTypeSelected.basketball} src={basketballImg} onClick={event => changeState(event)} id='basketball'></ChooseBox>
                    <ChooseBox typeSelected={isTypeSelected.bike} src={bikeImg} onClick={event => changeState(event)} id='bike'></ChooseBox>
                    <ChooseBox typeSelected={isTypeSelected.gamepad}src={gamepadImg} onClick={event => changeState(event)} id='gamepad'></ChooseBox>
                </Types>
                <Input type='date' placeholder='Дата' value={date} onChange={event => setDate(event.target.value)} required/>
                <Input type='time' placeholder='Время' value={time} onChange={event => setTime(event.target.value)} required/>
                <Input type='text' placeholder='Адрес' value={address} onChange={event => setAddress(event.target.value)} required/>
                <Reset onClick={() => {setXPos(''); setYPos(''); setIsMark(false)}}>Сбросить метку</Reset>
                <MapWindow>
                    <YMaps
                    query={{
                        ns: "use-load-option",
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
                                        balloonContentFooter: '<div><small>Дата: ' + date + '</small></div><div><small>Время: ' + time + '</small></div>' + address
                                    }}
                                />
                            }
                        </Map>
                        </div>
                    </YMaps>
                </MapWindow>
                <Button>Добавить мероприятие</Button>
            </form>
            <NegativeButton onClick={() => setIsFormActive(false)}>Отменить</NegativeButton>
        </Form> 
    )
}

export default EventForm;
