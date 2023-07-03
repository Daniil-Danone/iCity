import React, { useState, useEffect } from 'react'
import Button from '../UI/Button'
import styled from 'styled-components'
import avatar from '../images/avatar.jpg'
import UserForm from './UserForm'
import ProfilePopup from './ProfilePopup'

const Profile = styled.div`
    position: absolute;
    top: 0px;
    right: 20px;
    display: flex;
    box-sizing: border-box;
    box-shadow: 1px 1px 3px 0;
    background: linear-gradient(to bottom right, pink, white);
    border-radius: 0 0 10px 10px;
    padding: 10px 15px 10px 10px;
    width: auto;
    gap: 10px;
    z-index: 2;
`

const Username = styled.div`
    color: black;
    font-size: 26px;
    line-height: 50px;
    transition: 0.2s ease;

    &:hover {
        cursor: pointer;
        color: orange;
        text-decoration: none;
    }
      
    &:visited {
        color: black;
        text-decoration: none;
    }
`

const Avatar = styled.img`
  display: block;
  height: 50px;
  border-radius: 50%;
`


const ProfileBlock = () => {
    const [isActive, setIsActive] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');
    const [isProfilePopupActive, setIsProfilePopupActive] = useState(false);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));;
    const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));

    function profilePopup () {
        setIsProfilePopupActive(!isProfilePopupActive);
    }
    
    function authPopup () {
        setPopupTitle('Аутентификация');
        setIsActive(true);
    };
    
    function registrationPopup () {
        setPopupTitle('Регистрация');
        setIsActive(true);
    }; 
    
    function logout () {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isLogin");
        location.reload();
    };
    
    useEffect(() => {
        setInterval(() => {
          if (localStorage.getItem("isLogin") !== isLogin) {
            setIsLogin(true);
            setUser(JSON.parse(localStorage.getItem("user")));
          }
        }, 1000);
      }, [])

    return (
        <>
            <UserForm isActive={isActive} setIsActive={setIsActive} popupTitle={popupTitle}/>
            <ProfilePopup isProfilePopupActive={isProfilePopupActive} setIsProfilePopupActive={setIsProfilePopupActive} logout={logout}/>
            <Profile>
                {isLogin
                ? <Avatar src={avatar}></Avatar>
                : <Button onClick={authPopup}>Войти</Button>
                }
                {isLogin
                ? <Username onClick={profilePopup}>{user.name ? user.name : user.email}</Username>
                : <Button onClick={registrationPopup}>Зарегистрироваться</Button>
                }
            </Profile>
        </>
        
    )
}

export default ProfileBlock;
