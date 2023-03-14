import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'


const Chat_opt = styled.div`
    width: 15%;
    height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .Opt_ul{
        height: 100vh;
        font-size: 1.2rem;
        font-weight: 600;
        font-family: Arial, Helvetica, sans-serif;
        list-style: none;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 70px;
    }
    .options {
        width: 100%;
        height: 2rem;
        text-decoration: none;
        
        color: #9a9a9a;
        transition-duration: 0.3s;
        cursor: pointer;
        
    }
    .options:hover{
        color: white;
    }
    .selected{
        color: #ffffff;
        scale: 1.2;
        /* background-color: red; */

    }
    
    
    
    
    .icon{
        font-size: 1.5rem;
        color: #84b2c3;
        
    }

    .UserNameProf{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000000;
        color: white;
        border-radius: 5px;
        height: 50px;
        width: 70%;
        font-size: 1.2rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 500;
        margin: 20px ;
        letter-spacing: 0.1rem;
        
    
        

    }
    
    

`

export default function Chat_Options(props) {
    




    
    const HandleClick = (e)=>{
        
        
        // document.querySelectorAll('.options').forEach((elm)=>{
        //     elm.classList.remove('selected')
            
        // })
        const elmOption = (e.target.nodeName=="A")?(e.target):(e.target.parentElement)
        document.getElementById(props.Option).classList.remove('selected')
        elmOption.classList.add('selected')
        props.setOp(`${elmOption.id}`)
        

        
        
    }

    useEffect(()=>{
        console.log("useeffect from chat option is running")
        Array.from(document.getElementsByClassName('options')).forEach((elm)=>{
            elm.classList.remove("selected")
            console.log(elm)
        })
        const elm = document.getElementById(props.Option)
        elm.classList.add("selected")
    })
    
  return (
    <Chat_opt>
        <div className="UserNameProf">
            <i className="fa-solid fa-user user">  </i>{props.NameNsocket.Name}
        </div>
        <ul className='Opt_ul'>

            <a  className='options selected' id="Globel" onClick={HandleClick}>Globel <i className="fa-solid fa-globe icon "></i></a> 
            {/* <a  className='options ' id="Broadcast" onClick={HandleClick}>Broadcast <i className="fa-solid fa-podcast icon"></i></a> */}
            <a  className='options ' id="Group" onClick={HandleClick}>Group <i className="fa-sharp fa-solid fa-people-group icon"></i></a>
            <a  className='options ' id="Privite" onClick={HandleClick}>Privite <i className="fa-solid fa-user-group icon"></i></a>
        </ul>
    </Chat_opt>
  )
}
