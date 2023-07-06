import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import pencil from '../images/pencil.jpg';
import Input from '../UI/Input'
import Button from '../UI/Button'
import { useUser } from '../hooks/useUser'


const Container = styled.div`
    grid-area: info;
    width: 535px;
    height: 510px;
    max-height: 510px;
    border: 1px gray solid;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    padding: 10px;
`

const InfoTitleBlock = styled.div`
    display:flex;
    align-items:center;
    width: 290px;
    margin:0 auto;
`

const InfoImage = styled.img`
    margin-left: 15px;
`

const InfoTitle = styled.div`
    color: #000;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`

const UserInfo = styled.div`
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 80px;
`

const InfoGrid = styled.div`
    display: grid;
    height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
`



const ProfileInfoUser = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const token = localStorage.getItem("token")
    const [age, setAge] = useState(user.age);
    const [area, setArea] = useState(user.area);
    const [hobbies, setHobbies] = useState(user.hobbies);
    const [links, setLinks] = useState(user.links);
    const [about, setAbout] = useState(user.about);

    const updateUser = useUser().updateUser;

    async function onSubmit(event) {
        event.preventDefault();
        const data = {
            age: age,
            area: area,
            hobbies: hobbies,
            links: links,
            about: about
        }

        const response = await updateUser(token, data);
        setUser(response);
        localStorage.setItem("user", JSON.stringify(response));
    }

    useEffect(() => {}, [])
 
  return (
    <Container>
        <InfoTitleBlock>
            <InfoTitle>Личная информация</InfoTitle>
            <InfoImage src = {pencil} ></InfoImage>
        </InfoTitleBlock>
        <form onSubmit={event => onSubmit(event)} spellCheck="false">
            <InfoGrid>
                <UserInfo>Возраст</UserInfo>
                <Input type='text' placeholder={'Возраст'} value={age} onChange={event => setAge(event.target.value)}/>
                <UserInfo>Район</UserInfo>
                <Input type='text' placeholder={'Район'} value={area} onChange={event => setArea(event.target.value)}/>
                <UserInfo>Хобби</UserInfo>
                <Input type='text' placeholder={'Хобби'} value={hobbies} onChange={event => setHobbies(event.target.value)}/>
                <UserInfo>Соцсети</UserInfo>
                <Input type='text' placeholder={'Соцсети'} value={links} onChange={event => setLinks(event.target.value)}/>
                <UserInfo>О себе</UserInfo>
                <Input type='text' placeholder={'О себе'} value={about} onChange={event => setAbout(event.target.value)}/>  
            </InfoGrid>
            <Button>Сохранить</Button>
        </form>
    </Container>

    
  )
}

export default ProfileInfoUser;
