import React, { useState } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'
import DeleteButton from '../UI/DeleteButton';
import axios from 'axios';
import { styled } from 'styled-components';


const StyledMarkForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`


const MarkForm = ( { mark, setIsDone, setMarkStatus } ) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [title, setTitle] = useState(mark.title);
    const [description, setDescription] = useState(mark.description);

    const xpos = mark.xpos;
    const ypos = mark.ypos;

    const url = 'http://127.0.0.1:8000/api/v1/mark/' + mark.id

    function submitForm () {
        event.preventDefault()
        const mark = {
            title: title,
            description: description,
            author: user.id,
            xpos: xpos,
            ypos: ypos
        }
        axios
            .put(url, mark)
            .then(response => {
                setMarkStatus('маркер успешно добавлен');
                setIsDone(true);
            })
    };

    function deleteMark () {
        axios
            .delete(url)
            .then(response => {
                setMarkStatus('маркер удалён');
                setIsDone(true);
            })
    }
  return (
    <StyledMarkForm>
        <form onSubmit={submitForm} spellCheck="false">
            <Input placeholder='Заголовок' value={title} onChange={event => setTitle(event.target.value)} required />
            <Input placeholder='Описание' value={description} onChange={event => setDescription(event.target.value)}/>
            <Button>Изменить</Button>
        </form>
        <DeleteButton onClick={deleteMark}>Удалить маркер</DeleteButton>
    </StyledMarkForm>
    
  )
}

export default MarkForm;
