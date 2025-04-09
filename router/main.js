const express = require('express');
const router = express.Router();
const controller = require('../controller/formController');


router.post('/user-form', controller.userDetails)
router.get('/about', controller.about)
router.get('/user', controller.formInput)
router.get('/', controller.home)
router.use(controller.errorMessage)

module.exports = router;