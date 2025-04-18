require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const methodLog = require('./middleware/methodLogMiddleware.js');
const errorRouter = require('./middleware/errorRouterMiddleware.js');
const authUser = require('./routes/authRoutes.js');
const userDetails = require('./routes/userRoutes.js');
const jobData = require('./routes/jobRoutes.js');
const jobApplications = require('./routes/applicationRoutes.js');

app.use('/user', userDetails);
app.use('/job', jobData)
app.use('/application', jobApplications);
app.use('/', authUser);
app.get('/', (req, res) => res.send("WELCOME"));

app.use(methodLog);
app.use(errorRouter);

app.listen(PORT,()=>{
    console.log(`Server running on port : ${PORT}`);
});