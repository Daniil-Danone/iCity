import React, { useEffect } from 'react'
import MapBarAccordion from './MapBarAccordion'
import MapCardList from './MapCardList'
import MarkForm from './MarkForm'
import MenuBar from '../UI/MenuBar'
import Logo from '../UI/Logo'
import Button from '../UI/Button'
import InfoPopup from '../UI/InfoPopup'
import Accordion from '../UI/Accordion'
import objects from '../data/objects'


const MapBar = ({ isLogin, marks, popupText, setPopupText, isEditingMark, currentMark, setCurrentMark, isEditingDone, setIsEditingDone, infoPopupActive, setInfoPopupActive }) => {
    function changePopupState() {
        setPopupText('Кликните по месту, где хотите добавить объект')
        setInfoPopupActive(true);
    }

    useEffect(() => {}, [currentMark])
    
    return (
        <MenuBar>
            <InfoPopup active={infoPopupActive}>{popupText}</InfoPopup>
            <Logo href='/'>iCity</Logo>
            {(isEditingMark === false) && isLogin && <Button onClick={changePopupState}>Добавить метку</Button>}
            {currentMark
            ?   <MarkForm currentMark={currentMark} setIsEditingDone={setIsEditingDone} setPopupText={setPopupText}/>
            :   <MapCardList marks={marks}/>
            }
            {(isEditingMark === false)
            &&  <Accordion>
                    {objects.map((data) => (
                        <MapBarAccordion data={data} key={data.title}/>
                        ))
                    }
                </Accordion>
            }
        </MenuBar>
    )
}

export default MapBar
