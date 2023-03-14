import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import Message from './Message'


const Chat_Box = styled.div`
    
    text-align: center;
    /* overflow: hidden; */
    position: relative;
    width: 70%;
    /* overflow: hidden; */
    /* overflow: auto; */
    
    background: linear-gradient(45deg,black,#74d9e429);
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 0px 15px #000000;
    border: 10px solid #3a3f3f;
    
    
    

    

    .Window_head{
      width: 100%;
      height: 80px;
     
      position: relative;
      background: #336e72;
      /* background-color: #3ebdc6; */
      /* display: flex; */
      /* text-align: center; */
      
      /* margin: auto; */
      /* margin-top:20px; */

    }
    .Chat_type{
      font-size: 1.5rem;
      font-weight: 900;
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      letter-spacing: 0.03rem;
    }
    .Headtext{
      position: sticky;
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 0px 50px;    
      cursor: default;
    }
    .Participants{
      display: flex;
      color: #000000;
      gap: 10px;
      list-style: none;
      margin: 5px 0px;
      font-weight: normal;
      opacity: 0.6;
      font-size: 1rem;
      font-family: sans-serif;
      letter-spacing: 0.015rem;

    }
    .Inpmessage{
      position: fixed;
      height: 60px;
      bottom: 12px;
      width: 67%;
      margin: 0 5px;
      
     
    }
    .TypeBoard{
      width: 94%;
      text-align: left;
      padding: 0 30px;
      height: 60px;
      outline: none;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-family: Arial, Helvetica, sans-serif;
      letter-spacing: 0.02rem;
    }
    .Send{
      
      position: absolute;
      background: none;
      border: none;
      font-size: 1.5rem;
      right:0;
      top: 0;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      margin: 0 20px;
      color: #444242;
    }

    .Send:hover{
      color: black;
      
    }

    .ChatContainer{
      height: 77%;
      position: relative;
      overflow-y: auto;
    }

    
`


export default function Chat_window(props) {
  const InputRef = useRef(null)
  
  
  // const [MessagesAry, setMessagesAry] = useState([{message : "" , msgside :""}])
  


  //Ignore the Broadcast 
  const [MessagesAry , setMessagesAry] = useState(
    {
      Globel:{Messages:[{msg:"" , side:"" , sender:"" }]} ,
      Broadcast:{Messages:[{msg:"", side:"" , sender:""}]} , 
      Group:{Messages:[{msg:"" , side:"" , sender:""}]}  , 
      Privite:{Messages:[{msg:"" , side:"" , sender:""}]}
    
    })
    console.log("above the effect")
    
    useEffect(()=>{
      // Handling the recieve event ******************************************************
      console.log(`useEffect is running for component instance ${props.id}`);
      console.log(MessagesAry)
      // props.NameNsocket.Socket.on('user-join' , (name)=>{
      //   if (name != props.NameNsocket.Name) {
      //     console.log("new User Connected")
      //     appendMsg(`${name} join the chat ` , "left" , "NEW" , "Globel")
          
      //   }
      // })

      // props.NameNsocket.Socket.on('user-disconnected',(name)=>{
      //   appendMsg(`${name} leave the chat ` , "left" , "NEW" , "Globel")
      // })
      
      
      props.NameNsocket.Socket.on('recive' , (MsgData)=>{
   
        console.log("recive")
        console.log("under the if")
        console.log('recieve is called')
        if (MsgData.type == "Globel") {
          appendMsg(MsgData.message ,"left" , MsgData.Uname ,MsgData.type)
          props.NameNsocket.Socket.off('recive')
          
        }
        else if(MsgData.type=="Privite"){
          
                    
          props.setParticipents({...props.Participents , [MsgData.type]:[MsgData.Uname]})
          appendMsg(MsgData.message ,"left" , MsgData.Uname ,MsgData.type)
        }
        else{
          const members = MsgData.Group
          members.splice(members.indexOf(props.NameNsocket.Name) , 1)

          props.setParticipents({...props.Participents , [MsgData.type]:[...members]})
          appendMsg(MsgData.message ,"left" , MsgData.Uname ,MsgData.type)
        }
          
        
        
      })
      
   
      return ()=>{
        console.log("Clean Up is run")
        
        props.NameNsocket.Socket.off('user-join')
        props.NameNsocket.Socket.off('recive')
      }
    })
    
    
  

  
  
  
 

 

  //Append function *****************************************************************
  const appendMsg=(msg , side , senderName , type)=>{
    console.log("under the append")
    
    
    
    setMessagesAry((MessagesAry)=>{
      return {
        ...MessagesAry , [type]:{
          ...MessagesAry[type] , Messages:[
            ...MessagesAry[type].Messages ,{msg:msg , side:side , sender:senderName}
          ]
        }
      }
    })

    
    
   
  }
  

 
  
  
  
  
  
  
  const participants = ["participants1", "participants2", "participants3", "participants4"]


  //Handle click and send logic *****************************************************
  const Handle_Click = (e) => {
    
    console.log(MessagesAry.Globel)
    if (InputRef.current.value.trim()!="") {
      
      appendMsg(`${InputRef.current.value}` , 'right' , props.NameNsocket.Name ,props.Option)
      
      console.log("Under the handle click")
      console.log(props.NameNsocket.Socket)
      if (props.Option =="Globel") {
        
        props.NameNsocket.Socket.emit('send' , {message:(InputRef.current.value) , Uname : (props.NameNsocket.Name), type:(props.Option)});
      }
      else if(props.Option=="Privite"){
        props.NameNsocket.Socket.emit('send' , {message:(InputRef.current.value) , Uname : (props.NameNsocket.Name), type:(props.Option) ,to:props.Participents[props.Option] });

      }
      else{
        props.NameNsocket.Socket.emit('send' , {message:(InputRef.current.value) , Uname : (props.NameNsocket.Name), type:(props.Option) ,to:props.Participents[props.Option] , Group:[...props.Participents[props.Option] , props.NameNsocket.Name]});
      }
      
      
    }

    InputRef.current.value = ""
    
  }


  
  





  return (
    <Chat_Box>
      <div className="Window_head">
        <div className="Headtext">
          <span className='Chat_type'>{props.Option}</span>
          <ul className='Participants'>
            {props.Participents[`${props.Option}`].map((participent, index)=>{
              return <li key={index}>{participent}</li>
            })}
            
            
            


          </ul>

        </div>
      </div>


      <div className='ChatContainer'>
       
        

       
        {MessagesAry[props.Option].Messages.map((data, index) => {
          
          if (data.msg.trim()!="") {
            return <Message message={`${(data.sender)==(props.NameNsocket.Name)?"You":data.sender}:  ${data.msg}`} dir={data.side} key={index} />
            
          }
          
        })}

  

      </div>






      <div className="Inpmessage" >

        <input type="text" className='TypeBoard' ref={InputRef} placeholder='Type Your Message' onKeyDown={(e)=>{
          e.key=="Enter" ? Handle_Click() :null
        }}/>
        <button className='Send' onClick={Handle_Click}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>

      </div>


    </Chat_Box>

  )
}
