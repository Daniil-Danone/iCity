import React from 'react';
import styled from 'styled-components';

const StyledPopup = styled.div`
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    width: 400px;
    z-index: 1000;
`
const StyledPopupActive = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background-color: rgba(0, 8, 8, 0.4);
    position: fixed;
    align-items: center;
    justify-content: center;
    z-index: 1001;
`


const Popup = ({ isActive, setIsActive, children }) => {
    if (isActive) {
        return (
            <StyledPopupActive onClick={() => setIsActive(false)}>
                <StyledPopup onClick={(event) => event.stopPropagation()}>{children}</StyledPopup>
            </StyledPopupActive>
        )
    }
}

export default Popup;
