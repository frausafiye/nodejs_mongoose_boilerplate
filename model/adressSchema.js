const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const Adress=new Schema({
  street:{type:String,required:true},
  city:{type:String,required:true}
});

//dont create a model for that here. this is a sub-schema which will be added to the users schema!

module.exports=Adress;