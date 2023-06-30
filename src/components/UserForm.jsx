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


const UserForm = ({ active, setActive, popupTitle }) => {
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
    };

    function closeWindow(event) {
        setActive(false)
    };

    function authUser (data) {
        setMsg('Производится вход в аккаунт...');
        const url = 'http://127.0.0.1:8000/auth/token/login/'

        axios
            .post(url, data)
            .then(response => {
                console.log(response.data);
                localStorage.setItem('userToken', response.data.auth_token);
            })
    };

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
    };

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

export default UserForm;
