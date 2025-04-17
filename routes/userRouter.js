const express = require('express');
const router = express.Router();
const tokenVerify = require('../middleware/verifyTokenMiddleware');
const userController = require('../controllers/userDataController');

router.route('/')
  .get(tokenVerify, userController.usersData)
  .post(tokenVerify, userController.postData)
  .put(tokenVerify, userController.editData)
  .delete(tokenVerify, userController.deleteData)

router.get('/:userID',tokenVerify, userController.getUserById);

module.exports = router;