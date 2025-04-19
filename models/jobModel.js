const db = require('../config/db');

const getJob = async() => {
    const [jobs] = await db.query('SELECT * FROM jobpost');
    return jobs;
}

const getJobByID = async(ID) => {
    const [job] = await db.query('SELECT * FROM jobpost WHERE ID = ?', [ID]);
}

const jobExist = async(ID) => {
    const [existJob] = await db.query('SELECT * FROM jobpost WHERE ID = ?', [ID]);
    return existJob;
}

const postJob = async(jobtitle, salary, location) => {
    const [addJob] = await db.query('INSERT INTO jobpost (jobtitle, salary, location) VALUES (?, ?, ?)', [jobtitle, salary, location]);
    return addJob;
}

const updateJob = async(jobtitle, salary, location, ID) => {
    const [editJob] = await db.query('UPDATE jobpost SET jobtitle = ?, salary = ?, location = ? WHERE ID = ? ',
          [jobtitle, salary, location, ID]);
          return editJob;
}

const removeJob = async(ID) => {
    const [deleteJob] = await db.query('DELETE FROM jobpost WHERE ID = ?', [ID]);
    return deleteJob;
}

module.exports = { 
    getJob,
    jobExist,
    postJob,
    updateJob,
    removeJob
 }