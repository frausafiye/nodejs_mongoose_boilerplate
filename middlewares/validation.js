const { validationResult } = require("express-validator")

const Validation=(rules)=>{
  return [
    ...rules,

    //custom middleware
    (req,res,next)=>{
      const result=validationResult(req)
      if(result.isEmpty()){
      next()
      }else{
      let errorObj=new Error()
      let error=result.errors.map(err=>{
        return {[err.param]:err.msg}
      })
      errorObj.message=error
      next(errorObj)
      }
    }
  ]
}
module.exports=Validation;
//this middleware is not blocking the request. in any case it sends the req forward!If something is invalid, it adds and error in validationresults.