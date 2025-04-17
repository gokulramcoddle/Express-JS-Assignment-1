const jwt = require('jsonwebtoken');

const tokenVerify = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
       return res.json({error : "There is no Authorization token exist"});
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, 'mysecret', (err, decoded) => {
        if(err){
            return res.json({error : "Invalid Token"});
        }
        req.user = decoded;
        next();
    })
}

module.exports = tokenVerify;