import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../images/avatar.jpg';
import Button from '../UI/Button';
import UserForm from './UserForm';
import Link from '../UI/Link';


const StyledNavbar = styled.header`
  height: 60px;
  background-color: #f6f8fa;
`
const MenuList = styled.ul`
  display: flex;
  margin: 0;
  padding: 10px 20px 10px 60px;
  line-height: 40px;
  list-style: none;

  font-size: 22px;
  
  justify-content: space-between;
  align-items: center;
`
const MenuItem = styled.li`
`
const Logo = styled.div`
  font-size: 30px;
`
const Profile = styled.div`
  display: flex;
  gap: 10px;
`
const Avatar = styled.img`
  display: block;
  height: 40px;
  border-radius: 50%;
  border: 1px solid orange;
`


const Navbar = () => {
  const [active, setActive] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [user, setUser] = useState({});

  function authPopup() {
    setPopupTitle('Аутентификация');
    setActive(true);
  };

  function registrationPopup() {
    setPopupTitle('Регистрация');
    setActive(true);
  };

  function logout() {
    setUser({})
  };

  return (
    <>
      <UserForm active={active} setActive={setActive} popupTitle={popupTitle}/>
      <StyledNavbar>
        <MenuList>
          <MenuItem>
            <Logo>
              <Link href='/'>iCity</Link>
            </Logo>
          </MenuItem>
          <MenuItem><Link href='map'>Карта</Link></MenuItem>
          <MenuItem><Link href='events'>Мероприятия</Link></MenuItem>
          <MenuItem>
            <Profile>
              {user.name
              ? <Avatar src={avatar}></Avatar>
              : <Link onClick={authPopup}>Войти</Link>
              }
              {user.name
                ? <Link onClick={logout}>{user.name}</Link>
                : <Button onClick={registrationPopup}>Зарегистрироваться</Button>
              }
            </Profile>
          </MenuItem>
        </MenuList>
      </StyledNavbar>
    </>
    
  )
}

export default Navbar;
