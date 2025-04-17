const db = require('../models/db');

const usersApplication = async(req,res) => {
    try{
    const [usersApplications] = await db.query(
       `SELECT a.userID,j.title AS jobTitle,a.status,a.applieddate 
        FROM applications a 
        JOIN jobs j ON a.jobID = j.jobID 
        ORDER BY a.applieddate DESC`);
    res.json(usersApplications);
    }
    catch(err){
        res.json({error : err.message});
    }
}

const postApplication = async(req,res) => {
    const { jobID, userID, status } = req.body;
     if(!jobID || !userID || !status){
        res.json({Message : "Values cannot be empty"});
     }
    try{
       const [setID] = await db.query('SELECT MAX(applicationID) AS maxID FROM applications');
       const nextID = (setID[0].maxID || 0) + 1;
       const [result] = await db.query(
       `INSERT INTO applications(applicationID, jobID, userID, status, applieddate)
        VALUES(?, ?, ?, ?, now())`,[nextID, jobID, userID, status]);
       
        res.json({message : "Application created", Application : result});
        console.log(req.body);
    }
    catch(err){
        res.json({error : err.message});
    }
}

const updateJobStatus = async(req,res) => {
    const { applicationID } = req.body;
    const { status } = req.body;
  try{
    await db.query(`UPDATE applications SET status = ? WHERE applicationID = ?`, [status, applicationID]);
    res.json({message : "Application status updated"});
    console.log(req.body);
  }
  catch(err){
    res.json({error : err.message});
  }
}

const deleteApplication = async(req,res) => {
   const {applicationID } = req.body;
    try{
     const [applicationExist] = await db.query('SELECT * FROM applications WHERE applicationID = ?', [applicationID]);
     if(applicationExist.length === 0){
        return res.json({message : "Enter valid applicationID"});
     }
     await db.query('DELETE FROM applications WHERE applicationID = ?', [applicationID]);
     res.json({message : "Deleted application sucessfully"});
     console.log('deleteApplicationId : '+ json(req.body));
    }
    catch(err){
        res.json({error : err.message});
    }
}

const getApplicationById = async(req,res) => {
    const { userID } = req.params;
    try{
      const [exist] = await db.query( `
        SELECT a.userID,j.title AS jobTitle,a.status,a.applieddate 
        FROM applications a 
        JOIN jobs j ON a.jobID = j.jobID 
        WHERE a.userID = ?
        ORDER BY a.applieddate desc`, [userID]);
        console.log("UserID from params:", userID);
      if(exist.length == 0){
        return res.json({message : "Error : User not exist"})
      }
      res.json(exist);
    }
    catch(err){
      res.json({Error : err.message})
    }
  }

module.exports = { usersApplication, postApplication, updateJobStatus, deleteApplication, getApplicationById }