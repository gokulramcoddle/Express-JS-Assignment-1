const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/jobApplicationController');

router.route('/')
   .get(applicationController.usersApplication)
   .post(applicationController.postApplication)
   .put(applicationController.updateJobStatus)
   .delete(applicationController.deleteApplication)

router.get('/:userID', applicationController.getApplicationById); 

module.exports = router;