const db = require('./db');

const usersApplication = async() => {
   const [usersApplication] = await db.query(
        `SELECT a.userID,j.title AS jobTitle,a.status,a.applieddate 
         FROM applications a 
         JOIN jobs j ON a.jobID = j.jobID 
         ORDER BY a.applieddate DESC`
        );

     return usersApplication;
}

const applicationById = async(userID) => {
    const [exist] = await db.query( `
        SELECT a.userID,j.title AS jobTitle,a.status,a.applieddate 
        FROM applications a 
        JOIN jobs j ON a.jobID = j.jobID 
        WHERE a.userID = ?
        ORDER BY a.applieddate desc`, [userID]);

      return exist;
}

const addApplication = async(jobID, userID, status) => {
    const [setID] = await db.query('SELECT MAX(applicationID) AS maxID FROM applications');
       const nextID = (setID[0].maxID || 0) + 1;
       const [result] = await db.query(
       `INSERT INTO applications(applicationID, jobID, userID, status, applieddate)
        VALUES(?, ?, ?, ?, now())`,[nextID, jobID, userID, status]);

        return result;
}

const updateApplication = async(status, applicationID) => {
    const [update] = await db.query(`UPDATE applications SET status = ? WHERE applicationID = ?`, [status, applicationID]);
    return update;
}

const applicationExist = async(applicationID) => {
    const [existApplication] = await db.query('SELECT * FROM applications WHERE applicationID = ?', [applicationID]);
    return existApplication;
}

const deleteApplication = async(applicationID) => {
    const [removeApplication] = await db.query('DELETE FROM applications WHERE applicationID = ?', [applicationID]);
    return removeApplication;
}


module.exports = {
    applicationById,
    usersApplication,
    addApplication,
    updateApplication,
    applicationExist,
    deleteApplication
 };