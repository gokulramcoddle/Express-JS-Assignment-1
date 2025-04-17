const db = require('../models/db');

const signup = async(req,res) => {
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
}

module.exports = signup;
