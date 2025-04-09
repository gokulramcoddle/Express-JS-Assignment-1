
const formInput = (req,res)=>{
    res.send(`
        <h1> User Page </h1>
        <form action="/user-form" method="POST">
        <label>First Name:</label><input type="text" name=firstname>
        <label>Last Name :</label><input type="text" name=lastname>
        <label>Age :</label><input type="text" name=age>
        <label>Address :</label><input type="text" name=address>
        <button type="submit">Submit</button>
        </form>`);
}

const about = (req,res)=>{
    res.send('<h1> About Page </h1>');
}

const userDetails = (req,res)=>{
    res.send(`
        <h1> Form Submitted...  </h1>
        <h2>First Name : <span style="color:blue"> ${req.body.firstname} </span></h2>
        <h2>Last Name : <span style="color:blue"> ${req.body.lastname} </span></h2>
        <h2>Age : <span style="color:blue"> ${req.body.age} </span></h2>
        <h2>Address : <span style="color:blue"> ${req.body.address} </span></h2>`);
    console.log(req.body);
}

const home = (req,res)=>{
    res.send('<h1> ... Welcome ... </h1>');
}

const errorMessage = (req,res)=>{
    res.status(404).send(`<h1>Error 404</h1><p style="color:red">Please enter valid address</p>`)
}

module.exports = { formInput, about, userDetails, home, errorMessage };