import React from 'react';
import styled from 'styled-components';
import pencil from '../images/pencil.jpg'


const Container = styled.div`
    grid-area: info;
    width:535px;
    height:510px;
    max-height:510px;
    border:1px gray solid;
    display:flex;
    flex-direction:column;
    border-radius:20px;
    float:top;
`

const InfoTitleBlock = styled.div`
    display:flex;
    align-items:center;
    width:290px;
    margin:0 auto;
`

const InfoImage = styled.img`
    margin-left: 15px;
`

const InfoTitle = styled.h2`
    color: #000;
    font-size: 22px;
    font-family: Montserrat Alternates;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    
`

const InfoBlock = styled.div`
    width: 380px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-left:25px;
    margin-top:20px;
`
const UserInfo = styled.h2`
    color: #000;
    font-size: 20px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

const UserInfoInput = styled.h2`
    color: #000;
    font-size: 18px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    width:110px;
`


const ProfileInfoUser = () => {
 
  return (
    <Container>
        <InfoTitleBlock>
            <InfoTitle>Личная информация</InfoTitle>
            <InfoImage src = {pencil} ></InfoImage>
        </InfoTitleBlock>
        <InfoBlock>
            <UserInfo>Возраст</UserInfo>
            <UserInfoInput>124</UserInfoInput>
        </InfoBlock>
        <InfoBlock>
            <UserInfo>Район</UserInfo>
            <UserInfoInput>Ленинский</UserInfoInput>
        </InfoBlock>
        <InfoBlock>
            <UserInfo>Хобби</UserInfo>
            <UserInfoInput>Программирование</UserInfoInput>
        </InfoBlock>
        <InfoBlock>
            <UserInfo>Соцсети</UserInfo>
            <UserInfoInput>В дальнейшем поставить useState </UserInfoInput>
        </InfoBlock>
        <InfoBlock>
            <UserInfo>О себе</UserInfo>
            <UserInfoInput>rthrth</UserInfoInput>
        </InfoBlock>
    </Container>

    
  )
}

export default ProfileInfoUser;
