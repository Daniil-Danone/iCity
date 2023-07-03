import React, { useState } from 'react'
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
    border: 2px solid {props => props.color};
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
    const [type, setType] = useState();
    

    const xpos = mark.xpos;
    const ypos = mark.ypos;

    const defaultColor = '#0000000d';
    const activeColor = '#0000000d'

    const url = 'http://127.0.0.1:8000/api/v1/mark/' + mark.id

    function changeState(event) {
        const foo = document.querySelectorAll("img");
        
        for (var i = 0; i < foo.length; i++) {
            foo[i].classList.remove("active");
          }

        event.currentTarget.classList.add('active');
        console.log(event.currentTarget.id);
        setType(event.currentTarget.id);
    }

    function submitForm () {
        event.preventDefault()
        const mark = {            title: title,
            description: description,
            author: user.id,
            type: type,
            xpos: xpos,
            ypos: ypos
        }
        axios
            .put(url, mark)
            .then(response => {
                setMarkStatus('Маркер успешно добавлен');
                setIsDone(true);
            })
    };

    function deleteMark () {
        axios
            .delete(url)
            .then(response => {
                setMarkStatus('Маркер удалён');
                setIsDone(true);
            })
    }
  return (
    <StyledMarkForm>
        <form onSubmit={submitForm} spellCheck="false">
            <Input placeholder={mark.title} value={title} onChange={event => setTitle(event.target.value)} required />
            <Input placeholder={mark.description} value={description} onChange={event => setDescription(event.target.value)}/>
            <Types>
                <ChooseBox border={type} src={footballImg} onClick={event => changeState(event)} id='football'></ChooseBox>
                <ChooseBox border={type} src={basketballImg} onClick={event => changeState(event)} id='basketball'></ChooseBox>
                <ChooseBox border={type} src={bikeImg} onClick={event => changeState(event)} id='bike'></ChooseBox>
                <ChooseBox border={type} src={gamepadImg} onClick={event => changeState(event)} id='gamepad'></ChooseBox>
            </Types>
            
            <Button>Изменить</Button>
        </form>
        <DeleteButton onClick={deleteMark}>Удалить маркер</DeleteButton>
    </StyledMarkForm>
    
  )
}

export default MarkForm;

