import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const FrSt = styled.div`
    width: 15%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:20px;
    font-size: 1.2rem;
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    cursor: pointer;

    span{
        margin: 15px;
        /* max-height:10px; */
    }
    .user{
        font-size: 1.5rem;
        
    }
    .circle{
        font-size: 0.4rem;
        top: -18px;
        right: -3px;
        position: relative;
        color: green;
    }
    .OnlFri{
      position: fixed;
      top: 0;
      font-size: 1.6rem;
      font-family: Arial, Helvetica, sans-serif;
      letter-spacing: 0.3rem;
      color: #00ffd5;
      font-weight: 900;
      
      text-align: center;
      width: 139px;
    }
    .bar ul{
      list-style: none;
      display: flex;
      font-size: 1rem;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
      height: 130px;
      width: 100%;
      
      
    }
    
    .bar{
      /* display: flex; */
      display: none;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      box-shadow: 0px 0px 10px #00000090;
      background-color: #07070780;
      position: absolute;
      right: 130px;
      width: 14%;
      
      /* z-index: 2; */
      /* top: 0px; */
      
    }
    .bar ul :hover{
      color: #afd5f052;
      transition-duration: 0.3s;
    }
    .show{
      display: block;
    }
    .FriendsContainer{
      height: 40px;
      
      text-align: center;
      width: 100%;
      
    }
    .cross{
      color: #68a2b8;
      position: absolute;
      left: -18px;
      font-size: 1.5rem;
      /* right: 0; */
      top: -18px;
    }
    
  
    
`

export default function FriendStatus(propes) {
  const [Friends, setFriends] = useState({  Online: [] })
  

  useEffect(() => {
    console.log("under the client")
    propes.NameNsocket.Socket.on('Connected_clients', (data) => {
      console.log(data)
      setFriends({ ...Friends, Online: [...data] })
      console.log(Friends)
      // console.log(propes.Participents)
      console.log("after")
      propes.setParticipents({...propes.Participents , Globel:[...data]})
     

      // console.log(propes.Participents)
      
      console.log("Under the connected clients")
      
    }, [Friends, propes.NameNsocket.Socket])

    return (() => {
      console.log("clean up of the connected client is done")
      console.log(propes.Participents)
      propes.NameNsocket.Socket.off('Connected_clients')
    })
  } , [])
  // const FriendsORonline = (propes.Option == "Group" ?  Friends[]: Friends["Online"])

  const HandlingBar = (e) => {


    const parent = (e.target.nodeName) == "DIV" ? (e.target) : (e.target.parentElement)
    const bar = parent.querySelector(".bar")

    if (bar) {
      bar.style.top = `${e.pageY}px`
      Array.from(document.getElementsByClassName('bar')).forEach((elm) => {
        elm.classList.remove("show")
      })
      bar.classList.add('show')

    }






  }

  const CloseTheBar = (e) => {
    e.target.parentElement.classList.remove('show')
  }

  const HandleAddGroup = (e) => {
    const bar = e.target.parentElement.parentElement
    bar.classList.remove("show")
    const OnlineUsers = Friends.Online

    const FriendName = e.currentTarget.dataset.frname
    
    if (!(propes.Participents["Group"]).includes(FriendName) && FriendName != propes.NameNsocket.Name) {
      console.log("friend added")
      // setFriends({ ShowMembers: [...Friends.ShowMembers, { friendName: FriendName, online: (OnlineUsers.includes(FriendName)) }], Online: [...Friends.Online] })

      // setFriends({ ShowMembers: [...Friends.ShowMembers , FriendName], Online: [...Friends.Online] })
      propes.setParticipents({...propes.Participents , Group:[...propes.Participents.Group , FriendName]})
      console.log(propes.Participents.Group)


    }

    // console.log(Friends.ShowMembers)

  }
  const HandleRemoveGroup=(e)=>{
    const bar = e.target.parentElement.parentElement
    bar.classList.remove("show")
    const FriendName = e.currentTarget.dataset.frname
    // console.log(Friends.ShowMembers)
    const  CurrentMembers =  propes.Participents["Group"]
    console.log( CurrentMembers)
    const IndexOfFriend = CurrentMembers.indexOf(FriendName)
    console.log(IndexOfFriend)

    CurrentMembers.splice(0 , 1)
    // setFriends({...Friends , ShowMembers:[...CurrentMembers]})
    propes.setParticipents({...propes.Participents , Group:[...CurrentMembers]})
    


  }

  const HandleSendMessage = (e) => {
    console.log("under the sendmesage")
    const bar = e.target.parentElement.parentElement
    bar.classList.remove("show")
    propes.setParticipents({...propes.Participents , Privite:[(e.target.dataset.frname)]})
    propes.setOp("Privite")
  }


  return (
    <FrSt>
      {/* <span><i class="fa-solid fa-circle circle"></i><i class="fa-solid fa-user user"></i>     {propes.arr[0]}</span>
        <span><i class="fa-solid fa-circle circle"></i><i class="fa-solid fa-user user"></i>     {propes.arr[0]}</span>
        <span><i class="fa-solid fa-circle circle"></i><i class="fa-solid fa-user user"></i>     {propes.arr[0]}</span>
        <span><i class="fa-solid fa-circle circle"></i><i class="fa-solid fa-user user"></i>     {propes.arr[0]}</span> */}

      <span className='OnlFri'>{(propes.Option) == "Group" ? "Members" : "Online"}</span>
      {/* <span className='OnlFri'>Online</span> */}
     
      {console.log("Under the return ")}
      {((propes.Option=="Group")?(propes.Participents["Group"]):(Friends.Online)).map((element) => (
        <div key={element} onClick={HandlingBar} className="FriendsContainer">

          <i className="fa-solid fa-circle circle" style={{ color: "#00ef00" }}></i>
          <i className="fa-sharp fa-regular fa-user user" onClick={HandlingBar}></i> {"  " /* just for spaces*/}
          {console.log(element)}
          {element}

          <div className="bar"  >
            <i className="fa-solid fa-xmark cross" onClick={CloseTheBar}></i>
            <ul>
              <li onClick={HandleAddGroup} data-frname={element} >Add To Group</li>
              <li onClick={HandleRemoveGroup} data-frname={element} >Remove From Group</li>
              <li onClick={HandleSendMessage} data-frname={element}>Send Message</li>
            </ul>
          </div>
        </div>
      ))}


        


    </FrSt>
  )
}
