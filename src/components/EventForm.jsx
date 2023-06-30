import React, { useState } from 'react'
import Popup from '../UI/Popup';
import styled from 'styled-components'
import Button from '../UI/Button';
import CloseButton from '../UI/CloseButton';
import axios from 'axios';
import Input from '../UI/Input';


const Title = styled.div`
    width: 100%;
    text-align: center;
    font-family: Avimir, sans-serif;
`
const PopupContainer = styled.div`
    position: relative;
`
const Status = styled.div`
    width: 100%;
    margin-top: 15px;
    font-size: 12px;
    text-align: center;
    color: gray;
`


const EventForm = ({ active, setActive, popupTitle }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');

    function submitForm (event) {
        const data = {
            title: title,
            description: description,
            type: type,
            date: date,
            address: address,
            author: 1
        };
        setTitle('')
        setDescription('')
        setType('')
        setDate('')
        setAddress('')
        setActive(false)
        addEvent(data);
        event.preventDefault();
    };

    function closeWindow() {
        setActive(false)
    };

    function addEvent(data) {
        const url = 'http://127.0.0.1:8000/api/v1/event'
        axios
            .post(url, data)
            .then(response => {
                console.log(response.data);
            });
        location.reload()
        
    };

    return (
        <Popup active={active} setActive={setActive}>
            <PopupContainer>
                <Title>{popupTitle}</Title>
                <CloseButton onClick={closeWindow}></CloseButton>
                <form onSubmit={submitForm}>
                    <Input placeholder='Заголовок' value={title} onChange={event => setTitle(event.target.value)} required />
                    <Input placeholder='Описание' value={description} onChange={event => setDescription(event.target.value)} required/>
                    <Input placeholder='Тип активности' value={type} onChange={event => setType(event.target.value)} required/>
                    <Input placeholder='Дата' value={date} onChange={event => setDate(event.target.value)} required/>
                    <Input placeholder='Адрес' value={address} onChange={event => setAddress(event.target.value)} required/>
                    <Button>Добавить мероприятие</Button>
                </form>
                <Status></Status>
            </PopupContainer>
        </Popup>
    )
}

export default EventForm;
