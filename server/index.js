require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter=require("./routes/userRoutes");
const messageRouter=require("./routes/messageRoutes")
const errorHandler=require("./middleware/errorHandler");
const socket=require('socket.io');


const app = express();

app.use(cors());

app.use(express.json());

 

app.use('/api/auth',userRouter);
app.use("/api/message",messageRouter)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('database connected');
  })
  .catch(() => {
    console.log('data base unsuccesfull');
  });

app.use(errorHandler)
const server = app.listen(process.env.PORT, () => {
  console.log(`app is listening to the port ${process.env.PORT}`);
});

const io=socket(server,{
  cors:{
    origin:"http://localhost:3000",
    credentials:true
  }
})

global.onlineUsers=new Map();



io.on("connection",(socket)=>{
  
  global.chatSocket=socket;
  socket.on("add-user",(userId)=>{
    global.onlineUsers.set(userId,socket.id);
    
  })

  socket.on("send-message",(data)=>{
    const sendUserSocket=global.onlineUsers.get(data.to);
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit("recieve-message",data.message)
    }

  })
})


