const express = require('express');
const router = express.Router();
const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const api = require('./api/api.js');
const userFormApplication = require('./router/main.js');
const middleware = require('./middleware/middleware.js');

app.use('/apidata', api);
app.use('/', userFormApplication);
app.use('/',middleware);

app.listen(2002,()=>{
    console.log("Server running on port : 2002");
});