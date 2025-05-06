const db = require('../config/db');

const getJob = async() => {
    const [jobs] = await db.query('SELECT * FROM jobpost');
    return jobs;
}

const getJobByID = async(ID) => {
    const [job] = await db.query('SELECT * FROM jobpost WHERE ID = ?', [ID]);
    return job;
}

const getJobByLocation = async(location) => {
    const [availableJob] = await db.query('SELECT * FROM jobpost WHERE location = ?',[location]);
    return availableJob; 
}

const jobExist = async(ID) => {
    const [existJob] = await db.query('SELECT * FROM jobpost WHERE ID = ?', [ID]);
    return existJob;
}

const postJob = async(jobtitle, company, location, salary) => {
    const [addJob] = await db.query('INSERT INTO jobpost (jobtitle, company, location, salary) VALUES (?, ?, ?, ?)', [jobtitle, company, location, salary]);
    return addJob;
}

const updateJob = async(jobtitle, company, location, salary, ID) => {
    const [editJob] = await db.query('UPDATE jobpost SET jobtitle = ?, company= ?, location = ?, salary = ? WHERE ID = ? ',
          [jobtitle, company, location, salary, ID]);
          return editJob;
}

const removeJob = async(ID) => {
    const [deleteJob] = await db.query('DELETE FROM jobpost WHERE ID = ?', [ID]);
    return deleteJob;
}

module.exports = { 
    getJob,
    getJobByID,
    getJobByLocation,
    jobExist,
    postJob,
    updateJob,
    removeJob
 }