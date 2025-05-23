const express = require('express');
const router = express.Router();
const tokenVerify = require('../middleware/verifyTokenMiddleware');
const applicationController = require('../controllers/userApplicationController');

router.get('/', tokenVerify, applicationController.usersApplication);
router.get('/user', tokenVerify, applicationController.getApplicationById); 
router.post('/add/:jobpostID', tokenVerify, applicationController.postApplication);
router.put('/update', tokenVerify, applicationController.updateJobStatus);
router.delete('/delete/:ID', tokenVerify, applicationController.deleteApplication);

module.exports = router;