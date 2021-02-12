const UserModel=require("../model/usersModel")

exports.gettingAllUsers=async(req,res,next)=>{
  try{
  let users=await UserModel.find().populate("orders", "-__v")
  res.send({success:true,users:users})
  }catch(err){next(err)}
}

exports.gettingUser=async(req,res,next)=>{
  const {id}=req.params;
  try{
    const singleUser=await UserModel.findById(id);
    if(singleUser){
      res.send({success:true,user:singleUser})
    }else{
      res.status(404).send("no matching user found")
    }
  }catch(err){next(err)}
}

exports.addingUser=async(req,res,next)=>{
    try{
      const user=new UserModel(req.body);
      await user.save()
      let token = await user.generateAuthToken()
      res.header("x-auth",token)
      res.send({success:true,message:"user added into database",user:user}) 
    }catch(err){next(err)}
}

exports.updateUser=async(req,res,next)=>{ 
  const {id}=req.params;
  try{
    let updatedUser=await UserModel.findByIdAndUpdate(id,req.body,{new:true})
    if(updatedUser){
      res.send({success:true,updatedUser:updatedUser})
    }else{
      res.status(404).send("no matching user found")
    }
  }catch(err){next(err)}
}

exports.deleteUser=async(req,res,next)=>{ 
  const {id}=req.params;
  try{
    let user=await UserModel.findByIdAndRemove(id)
    if(user){
      res.send({success:true,message:"user deleted from database"})
    }else{
      res.status(404).send("o matching user found")
    }
  }catch(err){next(err)}
}