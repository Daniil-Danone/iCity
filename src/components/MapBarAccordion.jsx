import React, { useState } from 'react'
import { styled } from 'styled-components';
import CheckBox from '../UI/CheckBox'

const AccordionItem = styled.div`
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #2185fb;

`

const AccordionTitle = styled.div`
    color: #2185fb;
    display: flex;
    cursor: pointer;
    font-size: 26px;
    border-radius: 10px 10px 0 0;
    justify-content: space-between;
    
`

const AccordionContent = styled.div`
    color: #2185fb;
    margin: 5px 10px;
`


const MapBarAccordion = ({ data }) => {
    const [isActiveAccordion, setIsActiveAccordion] = useState(false);
  
    return (
        <AccordionItem>
            <AccordionTitle onClick={() => setIsActiveAccordion(!isActiveAccordion)}>
                <div>{data.title}</div>
                <div>{isActiveAccordion ? '-' : '+'}</div>
            </AccordionTitle>
            {isActiveAccordion 
            && data.content.map((data) => (
                <AccordionContent key={data}><CheckBox label={data}/></AccordionContent>
                ))
            }
        </AccordionItem>
    )
}

export default MapBarAccordion;
