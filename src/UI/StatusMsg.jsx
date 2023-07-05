import React from 'react'
import styled from 'styled-components'

const Status = styled.div`
  font-size: 14px;
  color: #2185fb;
`

const StatusMsg = ({ children }) => {
  return (
    <Status>
      { children }
    </Status>
  )
}

export default StatusMsg
