import React, { useState } from 'react'
import Popup from '../UI/Popup';
import styled from 'styled-components'
import Button from '../UI/Button';
import CloseButton from '../UI/CloseButton';
import Input from '../UI/Input';
import { useUser } from '../hooks/useUser';


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


const UserForm = ({ isActive, setIsActive, popupTitle }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    
    const { msg, getUserMe, authUser, regUser } = useUser(setIsActive);


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

    return (
        <Popup isActive={isActive} setIsActive={setIsActive}>
            <PopupContainer>
                <Title>{popupTitle}</Title>
                <CloseButton onClick={() => setIsActive(false)}></CloseButton>
                <form onSubmit={submitForm} spellCheck="false">
                    <Input placeholder='E-mail' value={email} onChange={event => setEmail(event.target.value)} required />
                    <Input placeholder='Пароль' value={password} onChange={event => setPassword(event.target.value)} required/>
                    {(popupTitle) === 'Регистрация'
                    && <Input placeholder='Имя' value={name} onChange={event => setName(event.target.value)}/>
                    }

                    {(popupTitle) === 'Регистрация' 
                    && <Input placeholder='Фамилия' value={surname} onChange={event => setSurname(event.target.value)}/>
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
