import React from 'react'
import styled from 'styled-components'
import MapBarAccordion from './MapBarAccordion'
import MapCardList from './MapCardList'
import MarkForm from './MarkForm'
import MenuBar from '../UI/MenuBar'
import Logo from '../UI/Logo'
import Button from '../UI/Button'
import InfoPopup from '../UI/InfoPopup'
import Accordion from '../UI/Accordion'


const MapBar = ( { marks, markStatus, editCurrentMark, setEditCurrentMark, addMark, setIsDone, setMarkStatus, isLogin }) => {
    const accordionData = [
        {'title': 'Футбол', 'content': ['Поля', 'Стадионы', 'Клубы', 'Прокат мячей']},
        {'title': 'Баскетбол', 'content': ['Поля', 'Стадионы', 'Клубы', 'Прокат мячей']},
        {'title': 'Велоспорт', 'content': ['Дорожки', 'Треки', 'Прокат велосипедов', 'Велопарковки', 'Интересные маршруты']},
        {'title': 'Киберспорт', 'content': ['Компьютерные клубы', 'Кибер-арены']}
    ]

    return (
        <MenuBar>
            {markStatus && <InfoPopup>{markStatus}</InfoPopup>}
            <Logo href='/'>iCity</Logo>
            {(editCurrentMark === false) && isLogin && <Button onClick={addMark}>Добавить метку</Button>}
            {editCurrentMark
            ?   <MarkForm mark={editCurrentMark} setEditCurrentMark={setEditCurrentMark} setIsDone={setIsDone} setMarkStatus={setMarkStatus}/>
            :   <MapCardList marks={marks}/>
            }
            {(editCurrentMark === false)
            && <Accordion>
                    {accordionData.map((data) => (
                        <MapBarAccordion data={data} key={data.title}/>
                        ))
                    }
                </Accordion>
            }
        </MenuBar>
    )
}

export default MapBar
