import express from 'express';
import http from 'http';
import { connectDB } from './db/index.js';
import "dotenv/config";
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js'; 
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);


//initilize socket.io server
export const io = new Server(server, {
    cors : {
        origin : '*',
    }
})

app.use(cors());
app.use(express.json({limit:'4mb'}));

await connectDB()
.then(()=>{
    server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
})
.catch((error)=>{
    console.log("Failed to start server due to DB connection error:", error);
});


app.get('/',(req,res)=>{
    res.send("<h1>Chat Server is Running</h1>");
})


//route setup
app.use('/api/auth',userRouter);
app.use('/api/messages',messageRouter);
