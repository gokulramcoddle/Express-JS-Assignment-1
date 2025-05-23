require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 2002;

app.disable('x-powered-by');
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors({
    origin : 'http://localhost:3000' ,
    exposedHeaders : ['Authorization']
  }));

const methodLog = require('./middleware/methodLogMiddleware.js');
const errorRouter = require('./middleware/errorRouterMiddleware.js');
const authUser = require('./routes/authRoutes.js');
const userDetails = require('./routes/userRoutes.js');
const jobData = require('./routes/jobRoutes.js');
const jobApplications = require('./routes/userApplicationRoutes.js');

app.use(methodLog);
app.use('/user', userDetails);
app.use('/job', jobData)
app.use('/application', jobApplications);
app.use('/', authUser);
app.get('/', (req, res) => res.send("WELCOME"));
app.use(errorRouter);

app.listen(PORT,()=>{
    console.log(`Server running on port : ${PORT}`);
});