import React, { useEffect, useState } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'
import DeleteButton from '../UI/DeleteButton';
import axios from 'axios';
import { styled } from 'styled-components';

import gamepadImg from '../images/gamepad.png'
import footballImg from '../images/football.png'
import basketballImg from '../images/basketball.png'
import bikeImg from '../images/bike.png'

const Types = styled.div`
    display: flex;
    justify-content: space-between;
`


const ChooseBox = styled.img`
    display: block;
    padding: 5px;
    margin: 5px 0 10px 0;
    border-radius: 10px;
    border: 3px solid ${(props) => 
        props.isSelected === true ? '#d58caa' : '#e6e6e6'};
`


const StyledMarkForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`


const MarkForm = ( { mark, setIsDone, setMarkStatus } ) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Не указано');

    const [isSelected, setIsSelected] = useState({
        'football': false,
        'basketball': false,
        'bike': false,
        'gamepad': false
    });
    

    const xpos = mark.xpos;
    const ypos = mark.ypos;

    const url = 'http://127.0.0.1:8000/api/v1/mark/' + mark.id

    function changeState(event) {
        const type = event.currentTarget.id
        setIsSelected({
            'football': type === 'football' ? true : false,
            'basketball': type === 'basketball' ? true : false,
            'bike': type === 'bike' ? true : false,
            'gamepad': type === 'gamepad' ? true : false
        });
        setType(type);
        event.preventDefault(); 
    }

    function submitForm (event) {
        const mark = {
            title: title,
            description: description,
            author: user.id,
            type: type,
            xpos: xpos,
            ypos: ypos
        };

        axios
            .put(url, mark)
            .then(() => {
                setMarkStatus('Маркер успешно добавлен');
                setIsDone(true);
            });
        event.preventDefault();
    };

    function deleteMark (event) {
        axios
            .delete(url)
            .then(() => {
                setMarkStatus('Маркер удалён');
                setIsDone(true);
            });
        event.preventDefault();
    }
  return (
    <StyledMarkForm>
        <form onSubmit={event => submitForm(event)} spellCheck="false">
            <Input placeholder={mark.title} value={title} onChange={event => setTitle(event.target.value)} required />
            <Input placeholder={mark.description} value={description} onChange={event => setDescription(event.target.value)}/>
            <Types>
                <ChooseBox isSelected={isSelected.football} src={footballImg} onClick={event => changeState(event)} id='football'></ChooseBox>
                <ChooseBox isSelected={isSelected.basketball} src={basketballImg} onClick={event => changeState(event)} id='basketball'></ChooseBox>
                <ChooseBox isSelected={isSelected.bike} src={bikeImg} onClick={event => changeState(event)} id='bike'></ChooseBox>
                <ChooseBox isSelected={isSelected.gamepad}src={gamepadImg} onClick={event => changeState(event)} id='gamepad'></ChooseBox>
            </Types>
            
            <Button>Сохранить</Button>
        </form>
        <DeleteButton onClick={event => deleteMark(event)}>Удалить маркер</DeleteButton>
    </StyledMarkForm>
    
  )
}

export default MarkForm;

