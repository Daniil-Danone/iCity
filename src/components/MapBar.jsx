import React from 'react'
import MapBarAccordion from './MapBarAccordion'
import MapCardList from './MapCardList'
import MarkForm from './MarkForm'
import MenuBar from '../UI/MenuBar'
import Logo from '../UI/Logo'
import Button from '../UI/Button'
import InfoPopup from '../UI/InfoPopup'
import Accordion from '../UI/Accordion'
import objects from '../data/objects'
import { useMarks } from '../hooks/useMarks'


const MapBar = () => {
    const isLogin = localStorage.getItem("isLogin");
    const markStatus = useMarks().markStatus;
    const editCurrentMark = useMarks().editCurrentMark;
    const addMark = useMarks().addMark;
     
    return (
        <MenuBar>
            {markStatus && <InfoPopup>{markStatus}</InfoPopup>}
            <Logo href='/'>iCity</Logo>
            {(editCurrentMark === false) && isLogin && <Button onClick={() => addMark}>Добавить метку</Button>}
            {editCurrentMark
            ?   <MarkForm/>
            :   <MapCardList/>
            }
            {(editCurrentMark === false)
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
