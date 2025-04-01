const express = require('express')
const app = express()
const http = require('http')

app.use((req,res,next)=>{
    console.log(`Started.. ${req.method}`)
    next()
})

app.use('/', (req,res,next)=>{
    res.send('<h1>Welcome to my server !!</h1>')
})


const server = http.createServer(app)
server.listen(3000);
