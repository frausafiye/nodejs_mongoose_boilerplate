const {body,check}=require("express-validator")

const rules=[
  //using check:
  check("email","no valid email")
    .isEmail()
    .normalizeEmail(),
  //using body:
  body("password")
    .isLength({min:6})
    .withMessage("password is too short"),
  body("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("please provide us with firstname"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("please provide us with lastname")
  ]
  //some helpful methods:
  //isString()
  //.isInt().isLength({min:4})
  //.isURL()

  module.exports=rules;