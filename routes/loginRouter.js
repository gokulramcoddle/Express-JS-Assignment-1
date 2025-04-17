const express = require('express');
const router = express.Router();
const loginUser = require('../controllers/loginController');

router.get('/', (req,res)=>{res.send('Login')});
router.post('/', loginUser);

module.exports = router;
