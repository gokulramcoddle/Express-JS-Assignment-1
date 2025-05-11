const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const loginUser = async(req,res) => {
  const { email, password} = req.body;
   if(!email || !password){
     return res.status(400).json({message : "Field cannot be empty"});
   }
  try{
    const userEmail = await userModel.emailExist(email);
    if(userEmail.length === 0){
     return res.status(404).json({message : "User not registered"})
    } 
    const user = userEmail[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message : "Invalid credentials"});
    }
    const token = jwt.sign(
        { userID : user.userID }, 
        process.env.JWT_SECRET,
        { expiresIn : '6h'});

    return res.header('Authorization', 'Bearer '+ token).json({message : "Login successfull", username : user.firstname, token : token});
  }
  catch(err){
    return res.json({error : err.message});
  }
}

const signup = async(req,res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "Field cannot be empty" });
  }
  try {
    const existEmail = await userModel.emailExist(email);
    if(existEmail.length > 0) {
      return res.status(401).json({ message : "EmailID already exist, Please Try another"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
     await userModel.addUser(firstname, lastname, email, hashedPassword);
     console.log(req.body);
       return res.status(200).json({message : "User Signed up Successfully"});
  } 
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { loginUser, signup };