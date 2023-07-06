import React, { useState } from 'react'
import Popup from '../UI/Popup';
import styled from 'styled-components'
import Button from '../UI/Button';
import CloseButton from '../UI/CloseButton';
import Input from '../UI/Input';
import { useUser } from '../hooks/useUser';
import CheckBox from '../UI/Checkbox';


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


const UserForm = ({ setIsLogin, setUser, isActive, setIsActive, popupTitle }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [msg, setMsg] = useState('');

    const [isChecked, setIsChecked] = useState(false);

    const authUser = useUser(setIsActive, setIsLogin, setUser).authUser;
    const regUser = useUser(setIsActive, setIsLogin, setUser).regUser;

    function submitForm (event) {
        setMsg('Пожалуйста, подождите...')
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

        if (popupTitle === 'Аутентификация') {
            authUser(authData)
        } else {
            regUser(regData, authData)
        }

        event.preventDefault();
    };

    return (
        <Popup isActive={isActive} setIsActive={setIsActive}>
            <PopupContainer>
                <Title>{popupTitle}</Title>
                <CloseButton onClick={() => setIsActive(false)}></CloseButton>
                <form onSubmit={event => submitForm(event)} spellCheck="false">
                    <Input type='text' placeholder='E-mail' value={email} onChange={event => setEmail(event.target.value)} required />
                    <Input type={isChecked ? 'text' : 'password'} placeholder='Пароль' value={password} onChange={event => setPassword(event.target.value)} required/>
                    <CheckBox label='Показать пароль' isChecked={isChecked} setIsChecked={setIsChecked}/>
                    {(popupTitle) === 'Регистрация'
                    && <Input type='text' placeholder='Имя' value={name} onChange={event => setName(event.target.value)}/>
                    }
                    {(popupTitle) === 'Регистрация' 
                    && <Input type='text' placeholder='Фамилия' value={surname} onChange={event => setSurname(event.target.value)}/>
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
