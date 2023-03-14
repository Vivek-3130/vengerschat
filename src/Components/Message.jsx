import React from 'react'
import styled from 'styled-components'

const MsgBox = styled.div`

    .msg{
        position: relative;
        display: flex;
        padding: 20px;
        margin: 20px;
        justify-content: center;
        align-items: center;
        /* float: right; */
        clear: both;
        font-size: 1.1rem;
        background-color: #6affc770;
        max-width: 300px;
        border-radius: 8px;
        font-family: sans-serif;

    }
    
`

export default function Message(propes) {
  return (
    <MsgBox>
        <div className="msg" style={{float:`${propes.dir}`}}>
            {propes.message}
        </div>
    </MsgBox>
  )
}
