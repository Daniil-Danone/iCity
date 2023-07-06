import React, { useEffect, useState } from 'react'
import Title from '../UI/Title';
import Input from '../UI/Input';
import Types from '../UI/Types';
import Button from '../UI/Button';
import Form from '../UI/Form';
import Reset from '../UI/Reset';
import ChooseBox from '../UI/ChooseBox';
import NegativeButton from '../UI/NegativeButton';
import EventMap from './EventMap';

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
                    <EventMap 
                    isMark={isMark}
                    onClickMap={onClickMap}
                    title={title}
                    type={type}
                    description={description}
                    date={date}
                    time={time}
                    address={address}
                    xpos={xpos}
                    ypos={ypos}
                    />
                </MapWindow>
                <Button>Добавить мероприятие</Button>
            </form>
            <NegativeButton onClick={() => {setIsMark(false), setIsFormActive(false)}}>Отменить</NegativeButton>
        </Form> 
    )
}

export default EventForm;
