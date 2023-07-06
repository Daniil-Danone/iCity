import React from 'react';
import MenuBar from '../UI/MenuBar';
import Logo from '../UI/Logo';
import Button from '../UI/Button';
import EventForm from './EventForm';
import SelectType from './SelectType';
import CheckBox from '../UI/Checkbox';


const EventBar = ({ setIsEditingDone, isChecked, setIsChecked, status, currentTypes, setCurrentTypes, isLogin, isFormActive, setIsFormActive }) => {
  return (
    <MenuBar>
      <Logo>iCity</Logo>
      {isFormActive === false && isLogin && <Button onClick={() => setIsFormActive(!isFormActive)}>Добавить мероприятие</Button>}
      {isFormActive && <EventForm setIsEditingDone={setIsEditingDone} popupTitle={'Добавить мероприятие'} setIsFormActive={setIsFormActive}/>}
      {isFormActive === false && <SelectType status={status} currentTypes={currentTypes} setCurrentTypes={setCurrentTypes}/>}
      {isFormActive === false && isLogin && <CheckBox label={'Понравившиеся'} isChecked={isChecked} setIsChecked={setIsChecked}></CheckBox>}
    </MenuBar>
  )
}

export default EventBar
