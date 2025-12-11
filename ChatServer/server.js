import express from 'express';
import http from 'http';
import { connectDB } from './db/index.js';
import "dotenv/config";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

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
