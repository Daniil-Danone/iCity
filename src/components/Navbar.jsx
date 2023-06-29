import React, { useState } from 'react'
import styled from 'styled-components'
import avatar from '../images/avatar.jpg'
import Button from '../UI/Button'
import RegistrationForm from './RegistrationForm'

const Menu = styled.div`
  display: flex;
  position: relative;
  top: 0;
  align-items: center;
  padding: 10px 20px;
  font-family: Avenir, sans-serif;
  
  border-bottom: 1px solid orange;
`
const Logo = styled.div`
  display: block;
  font-size: 30px;
`
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  font-size: 20px;
`
const Avatar = styled.img`
  display: block;
  height: 40px;
  border-radius: 50%;
  border: 1px solid orange;
`
const MenuList = styled.ul`
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  left: 50%;
  float: left;
`
const MenuItem = styled.li`
  position: relative;
  left: -50%;
  float: left;
  margin: 0 30px;
  height: 40px
  display: inline-block;
  padding: 10px;

  font-size: 20px;
  &::after {
    content: '';
    position: absolute;
    background: black;
    left: 0;
    bottom: 5px;
    width: 100%;
    height: 2px;
  }
`
const Link = styled.a`
  color: black;
  text-decoration: none;

  transition: 0.2s ease-in-out;

  &:link {
    text-decoration: none;
  }
  &:visited {
    text-decoration: none;
  }
  &:hover {
    color: orange;
    text-decoration: none;
  }
`

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [user, setUser] = useState({})

  function authPop() {
    setPopupTitle('Аутентификация');
    setActive(true);
  }

  function registrationPop() {
    setPopupTitle('Регистрация');
    setActive(true);
  }

  function logout() {
    setUser({})
  }

  return (
    <>
      <RegistrationForm active={active} setActive={setActive} popupTitle={popupTitle}/>
      <Menu>
        <Logo>
        <Link href='#'>iCity</Link>
        </Logo>
        <MenuList>
          <MenuItem><Link href='#'>Карта</Link></MenuItem>
          <MenuItem><Link href='#'>Мероприятия</Link></MenuItem>
          <MenuItem><Link href='#'>Сборы</Link></MenuItem>
        </MenuList>
        <Profile>
          {user.name
          ? <Avatar src={avatar}></Avatar>
          : <Button onClick={authPop}>Войти</Button>
          }
          {user.name
            ? <Link onClick={logout}>{user.name}</Link>
            : <Button onClick={registrationPop}>Зарегистрироваться</Button>
          }
        </Profile>
      </Menu>
    </>
    
  )
}

export default Navbar
