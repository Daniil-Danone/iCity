import React, { useState } from 'react'
import Popup from '../UI/Popup';
import styled from 'styled-components'
import Button from '../UI/Button';
import axios from 'axios';


const Title = styled.div`
    width: 100%;
    text-align: center;
    font-family: Avimir, sans-serif;
`

const CloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;

    &:before, &:after {
        content: ""; 
        position: absolute; 
        width: 20px;
        height: 2px;
        top: 5px;
        right: 0;
        background: orange;
    }

    &:before {
        transform: rotate(45deg);
    }
    &:after {
        transform: rotate(-45deg);
    }
`

const PopupContainer = styled.div`
    position: relative;
`

const Input = styled.input`
    width: calc(100% - 22px);
    margin: 10px auto;
    line-height: 50px;
    padding-left: 20px;
    background: rgba(0, 0, 0, 0.05);
    border: none;
    outline: none;
    border-radius: 5px;
    font-family: Avimir, sans-serif;
    transition: 0.2s ease-in-out;

    &:focus {
        background: rgba(255, 165, 0, 0.1);
    }
`

const Status = styled.div`
    width: 100%;
    margin-top: 15px;
    font-size: 12px;
    text-align: center;
    color: gray;
`

const RegistrationForm = ({ active, setActive, popupTitle}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    function submitForm (event) {
        const data = {
            email: email,
            password: password
        };

        setEmail('');
        setPassword('');

        (popupTitle) === 'Аутентификация' 
        ? authUser(data)
        : regUser(data)

        event.preventDefault()
    }

    function closeWindow(event) {
        setActive(false)
    }

    function authUser (data) {
        setMsg('Производится вход в аккаунт...');
        const url = 'http://127.0.0.1:8000/auth/token/login/'

        axios
            .post(url, data)
            .then(response => {
                console.log(response.data);
                localStorage.setItem('userToken', response.data.auth_token);
            })
    }

    function regUser(data) {
        setMsg('Создание аккаунта...');
        const url = 'http://127.0.0.1:8000/api/v1/auth/users/'
        axios
            .post(url, data)
            .then(response => {
                console.log(response.data);
                localStorage.setItem('userData', JSON.stringify(response.data));
                localStorage.getItem('userData');
            })
    }

    return (
        <Popup active={active} setActive={setActive}>
            <PopupContainer>
                <Title>{popupTitle}</Title>
                <CloseButton onClick={closeWindow}></CloseButton>
                <form onSubmit={submitForm}>
                    <Input placeholder='E-mail' value={email} onChange={event => setEmail(event.target.value)} required />
                    <Input placeholder='Пароль' value={password} onChange={event => setPassword(event.target.value)} required/>
                    {(popupTitle) === 'Аутентификация'
                    ? <Button>Войти</Button>
                    : <Button>Зарегистрироваться</Button>
                    }
                </form>
                <Status>{msg}</Status>
            </PopupContainer>
        </Popup>
    )
}

export default RegistrationForm
