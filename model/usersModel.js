const mongoose=require("mongoose")
const {Schema}=require("mongoose")
const AddressSchema=require("./adressSchema")
//verifying/comparing password:
const {encrypt,compare}=require("../lib/encryption")
//creating a token:
const JWT=require("jsonwebtoken")

const UserSchema=new Schema({
  firstName:{type:String,required:true},
  lastName:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  address:{type:AddressSchema, required:true},//embedded document!
  role:{
    type:String,
    enum:["Admin","User"],//enum specifies options 
    required:true},
  tokens:[
    {token:{type:String,required:true}}
  ],
  orders:[{ref:"orders",type:mongoose.Schema.Types.ObjectId}]
})

//hash the password just before saving the data into database:
UserSchema.pre("save",function(next){
  if(!this.isModified("password"))return next()
  this.password= encrypt(this.password)
  next()
})
// UserSchema.post("save",function(){..}

//create a custom method in the Schema:
UserSchema.methods.checkPassword=function(password){
return compare(password,this.password)}

//creating a token and pushing into usersSchema
UserSchema.methods.generateAuthToken=function(){
  const user=this;
  // JWT.sign(Payload,secretkey,options)
  const token=JWT.sign({id:this.id,email:this.email},process.env.API_TOKEN,{expiresIn:"1h"})
  user.tokens.push({token:token})
  user.save()
  return token
}

//finding user by token:
UserSchema.statics.findByToken=function(token){
  const user=this;
  let decoded;
  try{
  decoded=JWT.verify(token,process.env.API_TOKEN)
  }catch(err){return}
  let searchedUser=user.findOne({_id:decoded._id,"tokens.token":token}).select("-password -__v")
    return searchedUser
  //JS:
  //[tokens.token]=>for objects
  //"tokens.token"=>for arrays
}

//mongoose.model(<Collection>,<Document>)
const UserModel=mongoose.model("users",UserSchema)
module.exports=UserModel
