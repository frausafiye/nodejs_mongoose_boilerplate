const bcrypt = require('bcrypt');
const saltRounds = 10;//how many character should the encrypted password include.

//when creating the hash password for the first time:
exports.encrypt=(password)=>{
  if(!password) return "";
  return bcrypt.hashSync(password,saltRounds)
}

//when checking if the passwords match:
exports.compare=(password,hashedPassword)=>{
  return bcrypt.compareSync(password,hashedPassword)
  //it returns boolean!
}