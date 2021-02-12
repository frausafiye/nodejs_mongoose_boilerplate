const express=require("express")
const router=express.Router()
const {
  gettingAllUsers,gettingUser,addingUser,updateUser,deleteUser
}=require("../controller/usersControllers")

const rules=require("../lib/userRules")
const putRules=require("../lib/userPutRules")
const Validation=require("../middlewares/validation")
const {auth}=require("../middlewares/auth")
const { isAdmin } = require("../middlewares/checkRole")

router.get("/",auth,isAdmin,gettingAllUsers)

router.get("/:id",auth,gettingUser)

router.post("/",Validation(rules),isAdmin,addingUser)

router.put("/:id",auth,Validation(putRules),updateUser)

router.delete("/:id",auth,deleteUser)

module.exports=router