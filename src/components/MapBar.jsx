import React from 'react'
import styled from 'styled-components'
import MapBarAccordion from './MapBarAccordion'
import Button from '../UI/Button'
import MapCardList from './MapCardList'
import MarkForm from './MarkForm'


const StyledMenuBar = styled.div`
    display: flex;
    flex-direction: column;
    width: 380px;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 0 2px 0;
    
    background-color: #FEFAEC;
    z-index: 1;
`

const Logo = styled.div`
    color: #D58CAA;
    font-size: 26px;
    line-height: 50px;
    font-size: 50px;
    padding-bottom: 20px;
    border-bottom: 4px solid #D58CAA;
    transition: 0.2s ease;

    &:hover {
        cursor: pointer;
        color: orange;
        text-decoration: none;
    }

    &:visited {
        color: black;
        text-decoration: none;
    }
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

const MapBar = ( { marks, markStatus, editCurrentMark, setEditCurrentMark, addMark, setIsDone, setMarkStatus, isLogin }) => {
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
            <Logo href='/'>iCity</Logo>
            {editCurrentMark
            ?   <h2>Создание метки</h2>
            :   isLogin && <Button onClick={addMark}>Добавить метку</Button>
            }
            {editCurrentMark
            ?   <MarkForm mark={editCurrentMark} setEditCurrentMark={setEditCurrentMark} setIsDone={setIsDone} setMarkStatus={setMarkStatus}/>
            :   <MapCardList marks={marks}/>
            }
            {editCurrentMark
            ?   <></>
            :   <AccordionContainer>
                    {accordionData.map((data) => (
                        <MapBarAccordion data={data} key={data.title}/>
                        ))
                    }
                </AccordionContainer>
            }
            
            
        </StyledMenuBar>
    )
}

export default MapBar
