import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from '../UI/Link'
import MapBarAccordion from './MapBarAccordion'
import Button from '../UI/Button'
import MapCardList from './MapCardList'
import MarkForm from './MarkForm'


const StyledMenuBar = styled.div`
    display: flex;
    flex-direction: column;
    width: 380px;
    gap: 60px;
    padding: 20px;
    box-sizing: border-box;
    
    background-color: #FEFAEC;
    z-index: 1;
`

const Logo = styled.div`
    color: #ffffff;
    font-size: 50px;
    padding-bottom: 20px;
    border-bottom: 4px solid #D58CAA;
`

const AccordionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

`

const Info = styled.div`
  display: block;
  width: auto;
  left: 50%;
  top: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  text-align: center;
  z-index: 1;
  transform: translate(-50%);
`

const MapBar = ( { marks, markStatus, editCurrentMark, setEditCurrentMark, addMark, setIsDone, setMarkStatus }) => {
    const accordionData = [
        {'title': 'Футбол', 'content': ['Поля', 'Стадионы', 'Клубы', 'Прокат мячей']},
        {'title': 'Баскетбол', 'content': ['Поля', 'Стадионы', 'Клубы', 'Прокат мячей']},
        {'title': 'Велоспорт', 'content': ['Дорожки', 'Треки', 'Прокат велосипедов', 'Велопарковки', 'Интересные маршруты']},
        {'title': 'Киберспорт', 'content': ['Компьютерные клубы', 'Кибер-арены']}
    ]

    return (
        <StyledMenuBar>
            {markStatus
            && <Info>{markStatus}</Info>
            }
            <Logo>
                <Link href='/'>iCity</Link>
            </Logo>
            {editCurrentMark
            ? <>Редактирование кнопки</>
            :<Button onClick={addMark}>Добавить метку</Button>
            }
            <AccordionContainer>
                {accordionData.map((data) => (
                <MapBarAccordion data={data} key={data.title}/>
                ))}
            </AccordionContainer>
            {editCurrentMark
            ? <MarkForm mark={editCurrentMark} setEditCurrentMark={setEditCurrentMark} setIsDone={setIsDone} setMarkStatus={setMarkStatus}/>
            : <MapCardList marks={marks}/>
            }
        </StyledMenuBar>
    )
}

export default MapBar
