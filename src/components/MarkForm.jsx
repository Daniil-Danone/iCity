import React, { useEffect, useState } from 'react'
import Title from '../UI/Title';
import Input from '../UI/Input';
import Types from '../UI/Types';
import Button from '../UI/Button';
import Form from '../UI/Form';
import ChooseBox from '../UI/ChooseBox';
import NegativeButton from '../UI/NegativeButton';

import gamepadImg from '../images/gamepad.png';
import footballImg from '../images/football.png';
import basketballImg from '../images/basketball.png';
import bikeImg from '../images/bike.png';

import { useMarks } from '../hooks/useMarks';


const MarkForm = ({ currentMark, setIsEditingDone, setPopupText }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [title, setTitle] = useState(currentMark.title);
    const [description, setDescription] = useState(currentMark.description);
    const [type, setType] = useState(currentMark.type);

    const editMark = useMarks().editMark;
    const deleteMarkAPI = useMarks().deleteMark;

    const [isTypeSelected, setIsTypeSelected] = useState({
        'football': type === 'football' ? true : false,
        'basketball': type === 'basketball' ? true : false,
        'bike': type === 'bike' ? true : false,
        'gamepad': type === 'gamepad' ? true : false
    });

    function changeState(event) {
        if (event.currentTarget.id === type) {
            setType('Не указано')
            setIsTypeSelected({
                'football': false,
                'basketball': false,
                'bike': false,
                'gamepad': false
            })
        } else {
            const type = event.currentTarget.id
            setIsTypeSelected({
                'football': type === 'football' ? true : false,
                'basketball': type === 'basketball' ? true : false,
                'bike': type === 'bike' ? true : false,
                'gamepad': type === 'gamepad' ? true : false
            });
            setType(type);
        }
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

    useEffect(() => {}, [currentMark])

  return (
    <Form>
        <form onSubmit={event => submitForm(event)} spellCheck="false">
            <Title>Редактирование метки</Title>
            <Input placeholder={currentMark.title} value={title} onChange={event => setTitle(event.target.value)} required />
            <Input placeholder={currentMark.description} value={description} onChange={event => setDescription(event.target.value)}/>
            <Types>
                <ChooseBox typeSelected={isTypeSelected.football} src={footballImg} onClick={event => changeState(event)} id='football'/>
                <ChooseBox typeSelected={isTypeSelected.basketball} src={basketballImg} onClick={event => changeState(event)} id='basketball'/>
                <ChooseBox typeSelected={isTypeSelected.bike} src={bikeImg} onClick={event => changeState(event)} id='bike'/>
                <ChooseBox typeSelected={isTypeSelected.gamepad}src={gamepadImg} onClick={event => changeState(event)} id='gamepad'/>
            </Types>
            <Button>Сохранить</Button>
        </form>
        <NegativeButton onClick={event => deleteMark(event)}>Удалить маркер</NegativeButton>
    </Form>
  )
}

export default MarkForm;

