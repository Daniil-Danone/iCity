import React from 'react'
import MapCard from './MapCard'
import styled from 'styled-components'

const StyledMapCardList = styled.div`
  display: grid;
  grid-auto-rows: auto;
  gap: 10px;
  padding-right: 2px;
  font-family: Monserrat, sans-serif;
  overflow-y: scroll;
  overflox-x: hidden;
  
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 4px;
    background-color: #dedede;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2185fb;
    border-radius: 9em;
}
`

const MapCardList = ({ marks }) => {
  return (
    <StyledMapCardList>
        {marks.map(mark => <MapCard mark={mark} key={mark.id}/>)}
    </StyledMapCardList>
  )
}

export default MapCardList;
