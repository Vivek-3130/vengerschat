import { useEffect, useRef, useState } from 'react'
import Login from './Login'
import { BrowserRouter, Routes,Route , useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'



function App() {
  const [SocketNname , setSocketNname] = useState({})
  let TempSokcet ;
  
  function GettingNameSocket(enterdname) {
    if (enterdname) {
      console.log("function is called")
      
      const socket = io("http://localhost:8000")
      setSocketNname({Name:`${enterdname}` , Socket :socket})
      localStorage.setItem("UserName", enterdname)
      socket.emit('new-user-join' , enterdname) 
      
      
    }
    
  }

  
   
  
  
  
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Login setNameValue = {GettingNameSocket} />}></Route>
       {
         (SocketNname.Socket)?
         <Route exact path="/Dashboard" element ={<Dashboard NameNsocket={SocketNname}/>}/>:
         GettingNameSocket(localStorage.getItem('UserName'))
         
         
       }

      {/* <Route exact path="/Dashboard" element ={<Dashboard NameNsocket={SocketNname} setNameValue = {GettingNameSocket}/>}/> */}
        
      
        
        
      

        
      </Routes>
    
    
    </BrowserRouter>
  )
}

export default App
