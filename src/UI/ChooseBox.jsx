import React from 'react'
import styled from 'styled-components'

const StyledChooseBox = styled.img`
    display: block;
    padding: 5px;
    margin: 5px 0 10px 0;
    border-radius: 10px;
    border: 3px solid ${(props) => 
        props.typeSelected === true ? '#2185fb' : '#e6e6e6'};
    curdor: pointer;
`

const ChooseBox = ({ typeSelected, src, onClick, id }) => {
  return (
    <StyledChooseBox typeSelected={typeSelected} src={src} onClick={onClick} id={id}/>
  )
}

export default ChooseBox
