import React from 'react'
import styled from 'styled-components'


const Menu = styled.div`
    position: absolute;
    display: flex;
    margin: auto;
    left: 50%;
    padding: 10px;
    border-radius: 0 0 10px 10px;
    gap: 30px;
    box-sizing: border-box;
    background: #f0f5fa;
    box-shadow: 1px 1px 3px 0;
    width: auto;
    z-index: 2;
    font-size: 30px;
    transform: translate(-50%);
`

const MenuLink = styled.a`
    color: #2185fb;
    font-size: 26px;
    transition: 0.2s ease;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      color: #2185fb;
      text-decoration: none;
    }

    &:visited {
      text-decoration: none;
    }
`

const MenuBlock = () => {
  return (
    <Menu>
      <MenuLink href='/'>Карта</MenuLink>
      <MenuLink href='/events'>Мероприятия</MenuLink>
    </Menu>
  )
}

export default MenuBlock
