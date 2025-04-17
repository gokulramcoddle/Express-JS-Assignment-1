const db = require('../models/db');

const usersData = async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM users');
    res.json(users);
  } catch (err) {
    res.json({ error: err.message });
  }
}

const postData = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.json({ message: "Error: Value can't be empty" });
  }
  try {
    const [existEmail] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if(existEmail.length > 0) {
      return res.json({ message : "Error : emailID already exist, Please Try another"});
    }
    const [rows] = await db.query('SELECT MAX(userID) AS maxId FROM users');
    const nextId = (rows[0].maxId || 0) + 1;

    await db.query(
      'INSERT INTO users (userID, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)',
      [nextId, firstname, lastname, email, password]
    );

    res.json({userID: nextId, firstname, lastname, email, password});
    console.log(req.body);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const editData = async(req,res) => {
   const { userID, firstname, lastname, email, password} = req.body;
   try{
   const [updateData] = await db.query('UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ? WHERE userID = ?',
   [firstname, lastname, email, password, userID]);

   res.json(updateData);
   console.log(req.body);
   }
   catch(err){
     res.json({error : err.message});
   }
 }

const deleteData = async(req,res) => {
    const {userID} =  req.body;
    if(!userID){
      res.json({message : "Error: User not exist"});
    } 
    try{
      const [deleteUserData] = await db.query('DELETE FROM users WHERE userID = ?', [userID]);
      res.json(deleteUserData);
    }
    catch(err){
      res.json({error : err.message});
    }
  }

const getUserById = async(req,res) => {
    const { userID } = req.params;
    try{
      const [exist] = await db.query('SELECT * FROM users WHERE userID = ?', [userID]);
      if(exist.length == 0){
        return res.json({message : "Error : User not exist"})
      }
      res.json(exist);
    }
    catch(err){
      res.json({Error : err.message})
    }
  }

  module.exports = { usersData, postData, editData, deleteData, getUserById };