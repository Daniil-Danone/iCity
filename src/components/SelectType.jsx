import React from 'react'
import Types from '../UI/Types';
import ChooseBox from '../UI/ChooseBox';
import Form from '../UI/Form';
import Title from '../UI/Title';
import Reset from '../UI/Reset';
import StatusMsg from '../UI/StatusMsg'

import styled from 'styled-components'

import gamepadImg from '../images/gamepad.png';
import footballImg from '../images/football.png';
import basketballImg from '../images/basketball.png';
import bikeImg from '../images/bike.png';


const SelectType = ({ status, currentTypes, setCurrentTypes }) => {

    function resetState() {
        setCurrentTypes({
            'football': false,
            'basketball': false,
            'bike': false,
            'gamepad': false
        });
    }

    function changeState(event) {
        const type = event.currentTarget.id
        setCurrentTypes({
            'football': type === 'football' ? !(currentTypes.football) : currentTypes.football,
            'basketball': type === 'basketball' ? !(currentTypes.basketball) : currentTypes.basketball,
            'bike': type === 'bike' ? !(currentTypes.bike) : currentTypes.bike,
            'gamepad': type === 'gamepad' ? !(currentTypes.gamepad) : currentTypes.gamepad
        });
    }

    return (
        <Form>
            <Title>Тематика</Title>
            <Reset onClick={() => resetState()}>Сбросить фильтры</Reset>
            <Types>
                <ChooseBox typeSelected={currentTypes.football} src={footballImg} onClick={event => changeState(event)} id='football'/>
                <ChooseBox typeSelected={currentTypes.basketball} src={basketballImg} onClick={event => changeState(event)} id='basketball'/>
                <ChooseBox typeSelected={currentTypes.bike} src={bikeImg} onClick={event => changeState(event)} id='bike'/>
                <ChooseBox typeSelected={currentTypes.gamepad}src={gamepadImg} onClick={event => changeState(event)} id='gamepad'/>
            </Types>
            <StatusMsg>{status}</StatusMsg>
        </Form>
        
    )
}

export default SelectType
