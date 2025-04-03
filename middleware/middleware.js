const express = require('express')
const app = express()

 const middleware = app.use((req,res,next)=>{
    console.log(`Running Method : ${req.method}`)
    next()
})

module.exports = middleware;