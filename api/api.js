const express = require('express')
const router = express.Router()
const apiController = require('../controller/apiController');

router.route('/')
  .get(apiController.apiData)
  .post(apiController.postData)
  .put(apiController.putData)
  .delete(apiController.deleteData)
  
router.route('/:id').get(apiController.getById)

module.exports = router;