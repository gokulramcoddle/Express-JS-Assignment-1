const express = require('express');
const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const methodLog = require('./middleware/methodLogMiddleware.js');
const errorRouter = require('./middleware/errorRouterMiddleware.js');
const signupUser = require('./routes/signupRouter.js');
const loginUser = require('./routes/loginRouter.js');
const userDetails = require('./routes/userRouter.js');
const userJobApplications = require('./routes/jobApplicationRouter.js');

app.use('/signup', signupUser);
app.use('/login', loginUser);
app.use('/users', userDetails);
app.use('/jobapplication', userJobApplications);
app.get('/', (req, res) => res.send("WELCOME"));

app.use(methodLog);
app.use(errorRouter);

app.listen(2002,()=>{
    console.log("Server running on port : 2002");
});