require("dotenv").config();
const express = require("express")
const path = require("path");
const connectDB = require("./database/db");
const userRoute = require("./routes/userRoutes")


const app = express();
connectDB();

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hi")
})
app.use("/api/user",userRoute)

app.listen(8000,()=>{
    console.log("server started")
})