import React from 'react'
import styled from 'styled-components'
import Link from '../UI/Link'

const StyledProfilePopup = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    margin: auto;
    top: 80px;
    right: 20px;
    padding: 10px;
    border-radius: 10px;
    gap: 10px;
    box-sizing: border-box;
    background: #f0f5fa;
    box-shadow: 1px 1px 3px 0;
    width: auto;
    z-index: 2;
    font-size: 16px;
`

const StyledProfileItem = styled.div`
    color: #2185FB;
    &:hover {
        cursor: pointer;
    }
`

const ProfilePopup = ({ isProfilePopupActive, setIsProfilePopupActive, logout }) => {
    if (isProfilePopupActive) {
        return (
        <StyledProfilePopup>
            <StyledProfileItem onClick={() => setIsProfilePopupActive(false)}><Link href={'profile'}>Мой профиль</Link></StyledProfileItem>
            <StyledProfileItem onClick={() => setIsProfilePopupActive(false)}><Link>Настройки</Link></StyledProfileItem>
            <StyledProfileItem onClick={() => logout()}><Link>Выйти</Link></StyledProfileItem>
            </StyledProfilePopup>
        )
    }
}

export default ProfilePopup
