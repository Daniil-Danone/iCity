import React from 'react'
import styled from 'styled-components'

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
    background: #FEFAEC;
    box-shadow: 1px 1px 3px 0;
    width: auto;
    z-index: 2;
    font-size: 16px;
`

const StyledProfileItem = styled.div`
    &:hover {
        cursor: pointer;
    }
`

const ProfilePopup = ({ isProfilePopupActive, setIsProfilePopupActive, logout }) => {
    if (isProfilePopupActive) {
        return (
        <StyledProfilePopup>
            <StyledProfileItem onClick={() => setIsProfilePopupActive(false)}>Мой профиль</StyledProfileItem>
            <StyledProfileItem onClick={() => setIsProfilePopupActive(false)}>Настройки</StyledProfileItem>
            <StyledProfileItem onClick={() => logout()}>Выйти</StyledProfileItem>
            </StyledProfilePopup>
        )
    }
}

export default ProfilePopup
