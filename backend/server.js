require("dotenv").config();
const express = require("express")
const path = require("path");
const connectDB = require("./database/db");
const userRoute = require("./routes/userRoutes")
const chatRoute = require("./routes/chatRoutes")


const app = express();
connectDB();

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hi")
})
app.use("/api/user",userRoute)
app.use("/api/chat",chatRoute)

app.listen(8000,()=>{
    console.log("server started")
})