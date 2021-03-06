const express = require("express")
const morgan = require("morgan")
const mongoose=require("mongoose")
const indexRoutes= require("./routes/indexRoutes")
const usersRoute=require("./routes/usersRoutes")
const app=express()
app.use(express.json())
app.use(morgan("dev"))
require('dotenv').config()

mongoose.connect(process.env.MONGO_ATLAS,{useNewUrlParser:true,useUnifiedTopology:true},
()=>console.log("connection established between app and mongodb"))
//mongoose.connect(3000,{useNewUrlParser:true,useUnifiedTopology:true},()=>console.log("connection established between app and mongodb"))
mongoose.connection.on("error",()=>console.log("Error found while connecting"))

app.use("/api",indexRoutes)
app.use("/api/users",usersRoute)

//ERROR HANDLING:
app.use((req,res,next)=>{
  let error=new Error("no matching routes found")
  error.status=404
  next(error)
})

//UNIVERSAL ERROR HANDLING:
app.use((err,req,res,next)=>{
  res.status(err.status||500)
  res.send({success:false,message:err.message})
})



app.listen(3000||process.env.PORT, ()=>console.log("server is running"))