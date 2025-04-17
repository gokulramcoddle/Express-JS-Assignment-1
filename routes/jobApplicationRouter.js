const express = require('express');
const router = express.Router();
const tokenVerify = require('../middleware/verifyTokenMiddleware');
const applicationController = require('../controllers/jobApplicationController');

router.route('/')
   .get(tokenVerify, applicationController.usersApplication)
   .post(tokenVerify, applicationController.postApplication)
   .put(tokenVerify, applicationController.updateJobStatus)
   .delete(tokenVerify, applicationController.deleteApplication)

router.get('/:userID', tokenVerify, applicationController.getApplicationById); 

module.exports = router;