const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.get('/', (req,res)=>{res.send('Signup')});
router.post('/', signupController);

module.exports = router;