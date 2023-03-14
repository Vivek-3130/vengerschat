const express = require("express")
var app = express();
var server = app.listen(8000);
var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

const userSocketMap ={}
const connectedClients = new Map();


io.on('connection' , (socket)=>{
    let Username ;
    
    socket.on('new-user-join' , (name)=>{
        console.log("new_connection ")
        connectedClients.set(name , socket.id)
        Username = name;
    
        io.emit('Connected_clients' , Array.from(connectedClients.keys()))
        userSocketMap[socket.id] = socket;
        // socket.broadcast.emit('user-join' ,name)
        io.emit('user-join' ,name)

    })


    socket.on('disconnect' , ()=>{
        connectedClients.delete(Username)
        
        
        socket.broadcast.emit('user-disconnected', Username)
        io.emit('Connected_clients' , Array.from(connectedClients.keys()))
    })

    socket.on('send' , (data)=>{
        console.log("send is call")
        console.log(socket.id)
        if(data.type == "Globel")
        {
            socket.broadcast.emit('recive' ,data)

        }
        else{
            console.log(data.to)
            data.to.forEach(element => {
                io.to(connectedClients.get(element)).emit('recive' , data)
                
            });
            
            
        }
    })
    
})
