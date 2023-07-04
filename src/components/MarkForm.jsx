import React, { useState } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'
import NegativeButton from '../UI/NegativeButton';
import { styled } from 'styled-components';

import gamepadImg from '../images/gamepad.png'
import footballImg from '../images/football.png'
import basketballImg from '../images/basketball.png'
import bikeImg from '../images/bike.png'
import { useMarks } from '../hooks/useMarks';

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
        props.typeSelected === true ? '#d58caa' : '#e6e6e6'};
`


const StyledMarkForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid #D58CAA;
`


const MarkForm = ({ currentMark, setIsEditingDone, setPopupText }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Не указано');

    const editMark = useMarks().editMark;
    const deleteMarkAPI = useMarks().deleteMark;

    const [isTypeSelected, setIsTypeSelected] = useState({
        'football': false,
        'basketball': false,
        'bike': false,
        'gamepad': false
    });

    function changeState(event) {
        const type = event.currentTarget.id
        setIsTypeSelected({
            'football': type === 'football' ? true : false,
            'basketball': type === 'basketball' ? true : false,
            'bike': type === 'bike' ? true : false,
            'gamepad': type === 'gamepad' ? true : false
        });
        setType(type);
    }

    async function submitForm (event) {
        event.preventDefault();
        const mark = {
            title: title,
            description: description,
            author: user.id,
            type: type,
            xpos: currentMark.xpos,
            ypos: currentMark.ypos
        };

        const response = await editMark(currentMark.id, mark)
        if (response) {
            setPopupText('Метка успешно сохранена');
            setIsEditingDone(true);
        }  
    }

    async function deleteMark(event) {
        event.preventDefault();
        const response = await deleteMarkAPI(currentMark.id);
        if (response) {
            setPopupText('Метка удалена');
            setIsEditingDone(true);
        }
    }

  return (
    <StyledMarkForm>
        <form onSubmit={event => submitForm(event)} spellCheck="false">
            <Input placeholder={currentMark.title} value={title} onChange={event => setTitle(event.target.value)} required />
            <Input placeholder={currentMark.description} value={description} onChange={event => setDescription(event.target.value)}/>
            <Types>
                <ChooseBox typeSelected={isTypeSelected.football} src={footballImg} onClick={event => changeState(event)} id='football'></ChooseBox>
                <ChooseBox typeSelected={isTypeSelected.basketball} src={basketballImg} onClick={event => changeState(event)} id='basketball'></ChooseBox>
                <ChooseBox typeSelected={isTypeSelected.bike} src={bikeImg} onClick={event => changeState(event)} id='bike'></ChooseBox>
                <ChooseBox typeSelected={isTypeSelected.gamepad}src={gamepadImg} onClick={event => changeState(event)} id='gamepad'></ChooseBox>
            </Types>
            <Button>Сохранить</Button>
        </form>
        <NegativeButton onClick={event => deleteMark(event)}>Удалить маркер</NegativeButton>
    </StyledMarkForm>
  )
}

export default MarkForm;

