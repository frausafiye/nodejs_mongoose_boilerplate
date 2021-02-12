const express=require("express")
const router=express.Router()
const getController=require("../controller/indexController")
const UserModel=require("../model/usersModel")

router.get("/",getController)

router.post("/login",async(req,res,next)=>{
  const {email,password}=req.body
  try{
    const user=await UserModel.findOne({email})
    if(!user){
      throw new Error("email does not exist")
    }else{
      if(!user.checkPassword(password)){
        throw new Error("password does not match")
      }
      //1)send token through the header:
      res.header("x-auth",user.generateAuthToken())
      //2)send token through the cookie:
      // res.cookie("token",user.generateAuthToken())
      res.send("You successfully logged in")
    }
  }catch(err){next(err)}
})

module.exports=router