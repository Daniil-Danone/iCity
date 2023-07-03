import React, { useState, useEffect } from 'react'
import Link from '../UI/Link'
import Button from '../UI/Button'
import styled from 'styled-components'
import avatar from '../images/avatar.jpg'
import UserForm from './UserForm'

const Profile = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    box-sizing: border-box;
    box-shadow: 1px 1px 3px 0;
    background: linear-gradient(to bottom right, pink, white);
    border-radius: 20px;
    padding: 5px 15px 5px 10px;
    width: auto;
    gap: 10px;
    z-index: 2;
`

const Username = styled.a`
    color: black;
    font-size: 26px;
    line-height: 50px;;

    &:hover  {
        cursor: pointer;
        color: orange;
        text-decoration: none;
      }
      
      &:visited {
        color: red;
        text-decoration: none;
      }
`

const Avatar = styled.img`
  display: block;
  height: 50px;
  border-radius: 50%;
`


const ProfileBlock = () => {
    const [active, setActive] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));;
    const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));
    
    function authPopup() {
        setPopupTitle('Аутентификация');
        setActive(true);
    };
    
    function registrationPopup() {
        setPopupTitle('Регистрация');
        setActive(true);
    }; 
    
    function logout() {
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
            <UserForm active={active} setActive={setActive} popupTitle={popupTitle}/>
            <Profile>
                {isLogin
                ? <Avatar src={avatar}></Avatar>
                : <Link onClick={authPopup}>Войти</Link>
                }
                {isLogin
                ? <Username onClick={logout}>{user.name ? user.name : user.email}</Username>
                : <Button onClick={registrationPopup}>Зарегистрироваться</Button>
                }
            </Profile>
        </>
        
    )
}

export default ProfileBlock;
