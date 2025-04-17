const express = require('express')
const router = express.Router()
const userController = require('../controllers/userDataController');

router.route('/')
  .get(userController.usersData)
  .post(userController.postData)
  .put(userController.editData)
  .delete(userController.deleteData)

router.get('/:userID',userController.getUserById);

module.exports = router;