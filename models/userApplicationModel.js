const db = require('../config/db');

const usersApplication = async() => {
   const [usersApplication] = await db.query("SELECT * FROM user_application");
   return usersApplication;
}

const applicationById = async(userID) => {
    const [exist] = await db.query(
        `SELECT * FROM user_application a
         JOIN jobpost j ON j.ID = a.jobpostID
         WHERE userID = ?`, [userID]);

      return exist;
}

const addApplication = async(
    userID, jobpostID, firstname, lastname,
    gender, dob, tenth_percentage, twelth_percentage,
    university_cgpa, skills, experience, about_you, applied_on
    ) => {
 const [result] = await db.query(
      `INSERT INTO user_application( 
       userID, jobpostID, firstname, lastname,
       gender, dob, tenth_percentage, twelth_percentage,
       university_cgpa, skills, experience, about_you, applied_on)
       VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())`,
       [userID, jobpostID, firstname, lastname,
        gender, dob, tenth_percentage, 
        twelth_percentage,university_cgpa, skills, 
        experience, about_you, applied_on]
    );
        return result;
}

const updateApplication = async(status, ID) => {
    const [update] = await db.query('UPDATE user_application SET status = ? WHERE ID = ?', [status, ID]);
    return update;
}

const applicationExist = async(ID) => {
    const [existApplication] = await db.query('SELECT * FROM user_application WHERE ID = ?', [ID]);
    return existApplication;
}

const userApplication = async(userID, jobpostID) => {
    const [existUserApplication] = await db.query('SELECT * FROM user_application WHERE userID = ? AND jobpostID = ?',
          [userID, jobpostID]);
    return existUserApplication;
}

const deleteApplication = async(ID) => {
    const [removeApplication] = await db.query('DELETE FROM user_application WHERE ID = ?', [ID]);
    return removeApplication;
}


module.exports = {
    applicationById,
    usersApplication,
    addApplication,
    updateApplication,
    applicationExist,
    userApplication,
    deleteApplication
 };