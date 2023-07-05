import React, { useState } from 'react'
import Title from '../UI/Title';
import Input from '../UI/Input';
import Types from '../UI/Types';
import Button from '../UI/Button';
import Form from '../UI/Form';
import ChooseBox from '../UI/ChooseBox';
import NegativeButton from '../UI/NegativeButton';
import styled from 'styled-components';

import gamepadImg from '../images/gamepad.png';
import footballImg from '../images/football.png';
import basketballImg from '../images/basketball.png';
import bikeImg from '../images/bike.png';
import { useEvents } from '../hooks/useEvents';




const EventForm = ({ setIsFormActive, popupTitle }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Не указано');
    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');

    const addEvent = useEvents().addEvent;
    
    const [isTypeSelected, setIsTypeSelected] = useState({
        'football': false,
        'basketball': false,
        'bike': false,
        'gamepad': false
    });

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
            address: address,
            author: 1
        };

        const response = await addEvent(eventData)
        if (response) {
            setIsFormActive(false);
        }
    };

    return (
        <Form>
            <Title>{popupTitle}</Title>
            <form onSubmit={submitForm}>
                <Input placeholder='Заголовок' value={title} onChange={event => setTitle(event.target.value)} required />
                <Input placeholder='Описание' value={description} onChange={event => setDescription(event.target.value)}/>
                <Types>
                    <ChooseBox typeSelected={isTypeSelected.football} src={footballImg} onClick={event => changeState(event)} id='football'></ChooseBox>
                    <ChooseBox typeSelected={isTypeSelected.basketball} src={basketballImg} onClick={event => changeState(event)} id='basketball'></ChooseBox>
                    <ChooseBox typeSelected={isTypeSelected.bike} src={bikeImg} onClick={event => changeState(event)} id='bike'></ChooseBox>
                    <ChooseBox typeSelected={isTypeSelected.gamepad}src={gamepadImg} onClick={event => changeState(event)} id='gamepad'></ChooseBox>
                </Types>
                <Input placeholder='Дата' value={date} onChange={event => setDate(event.target.value)} required/>
                <Input placeholder='Адрес' value={address} onChange={event => setAddress(event.target.value)} required/>
                <Button>Добавить мероприятие</Button>
            </form>
            <NegativeButton onClick={() => setIsFormActive(false)}>Отменить</NegativeButton>
        </Form> 
    )
}

export default EventForm;
