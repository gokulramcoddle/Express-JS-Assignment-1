const db = require('../models/db');
const jwt = require('jsonwebtoken');

const loginUser = async(req,res) => {
  const { email, password} = req.body;
   if(!email || !password){
     return res.json({message : "Field cannot be empty"});
   }
  try{
    const [userEmail] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if(userEmail.length === 0){
     return res.json({message : "User not registered"})
    }
    
    const user = userEmail[0];
    const userPassword = userEmail[0].password;

    if(userPassword !== password){
        return res.json({message : "Invalid credentials"})
    }
    
    const token = jwt.sign(
        { userID : user.userID, email : user.email },'mysecret',
        { expiresIn : '12h'});
    res.json({message : "Login successfull", Token : token});

  }
  catch(err){
    res.json({error : err.message});
  }
}

module.exports = loginUser;