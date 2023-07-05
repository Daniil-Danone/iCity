import React from 'react'
import MenuBar from '../UI/MenuBar'
import Logo from '../UI/Logo'
import Button from '../UI/Button'
import EventForm from './EventForm'
import SelectType from './SelectType'


const EventBar = ({ status, currentTypes, setCurrentTypes, isLogin, isFormActive, setIsFormActive }) => {
  return (
    <MenuBar>
      <Logo>iCity</Logo>
      {isFormActive === false && isLogin && <Button onClick={() => setIsFormActive(!isFormActive)}>Добавить мероприятие</Button>}
      {isFormActive && <EventForm popupTitle={'Добавить мероприятие'} setIsFormActive={setIsFormActive}/>}
      {isFormActive === false && <SelectType status={status} currentTypes={currentTypes} setCurrentTypes={setCurrentTypes}/>}
    </MenuBar>
  )
}

export default EventBar
