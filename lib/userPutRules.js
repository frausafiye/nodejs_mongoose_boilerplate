const {body,check}=require("express-validator")

const rules=[
  //using check:
  check("email","no valid email")
    .optional()
    .isEmail()
    .normalizeEmail(),
  //using body:
  body("password")
  .optional()
    .isLength({min:6})
    .withMessage("password is too short"),
  body("firstName")
  .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("please provide us with firstname"),
  body("lastName")
  .optional()
    .trim()
    .notEmpty()
    .withMessage("please provide us with lastname")
  ]

  module.exports=rules;
  //try if it is possible to push(.optional()) to each element in the userRules.??????