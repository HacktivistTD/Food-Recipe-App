const express= require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const  userRouter =require('./Routes/auth')
const cokieParser =require('cookie-parser')
const recipeRouter = require('./Routes/reciper')
const app = express()


app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST"],
    credentials:true
}))
app.use(cokieParser())
app.use (express.json())
app.use('/auth',userRouter)
app.use('/recipe',recipeRouter)


mongoose.connect('mongodb://127.0.0.1:27017/recipeapp')



app.listen(3001,()=>{

    console.log("Server Started")
    
})