import React, { useState } from 'react'
import Popup from '../UI/Popup';
import styled from 'styled-components'
import Button from '../UI/Button';
import CloseButton from '../UI/CloseButton';
import axios from 'axios';
import Input from '../UI/Input';
import { useDispatch, useSelector } from 'react-redux';


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
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [msg, setMsg] = useState('');
    const [inputColor, setInputColor] = useState('');

    const dispatch = useDispatch();
    const API = useSelector(state => state.api);


    function submitForm (event) {
        const authData = {
            email: email,
            password: password
        };

        const regData = {
            email: email,
            password: password,
            name: name,
            surname: surname
        };

        (popupTitle) === 'Аутентификация' 
        ? authUser(authData)
        : regUser(authData, regData)

        event.preventDefault();
    };

    function closeWindow() {
        setActive(false)
    };

    function getUser(token) {
        const url = API + "/api/v1/auth/users/me"

        axios
            .get(url, {
                headers: {"Authorization": token}
            })
            .then(response => {
                if (response.status === 200) {
                    setMsg('Производится вход в аккаунт');
                    setTimeout(() => {
                        localStorage.setItem("isLogin", true);
                        localStorage.setItem("user", JSON.stringify(response.data));
                        closeWindow();
                    }, 2000);
                } else {
                    setMsg('Произошла ошибка...');
                }
            })
    };

    function authUser (authData) {
        const url = 'http://127.0.0.1:8000/auth/token/login/'

        axios
            .post(url, authData)
            .then(response => {                
                if (response.status === 200) {
                    localStorage.setItem('token', 'Token ' + response.data.auth_token);
                    getUser(localStorage.getItem("token"));
                } else {
                    setMsg('Произошла ошибка...');
                }
            })
    };

    function regUser(authData, regData) {
        setMsg('Создание аккаунта...');
        const url = 'http://127.0.0.1:8000/api/v1/auth/users/'

        axios
            .post(url, regData)
            .then(response => {        
                if (response.status === 201) {
                    authUser(authData);
                } else {
                    setMsg('Произошла ошибка...');
                }
            })
    };

    return (
        <Popup active={active} setActive={setActive}>
            <PopupContainer>
                <Title>{popupTitle}</Title>
                <CloseButton onClick={closeWindow}></CloseButton>
                <form onSubmit={submitForm} spellCheck="false">
                    <Input placeholder='E-mail' value={email} onChange={event => setEmail(event.target.value)} required />
                    <Input placeholder='Пароль' value={password} onChange={event => setPassword(event.target.value)} required/>
                    {(popupTitle) === 'Регистрация'
                    ? <Input placeholder='Имя' value={name} onChange={event => setName(event.target.value)}/>
                    : <></>
                    }
                    {(popupTitle) === 'Регистрация'
                    ? <Input placeholder='Фамилия' value={surname} onChange={event => setSurname(event.target.value)}/>
                    : <></>
                    }
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
