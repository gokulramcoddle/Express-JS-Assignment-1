const data = {
  api : require('../data/data.json'),
  newdata : function(data){
  this.api = data;
  }
}

const apiData = (req,res)=>{
    res.json(data.api)
}

const postData = (req,res)=>{
    const postdata = {
       id : data.api?.length? data.api[data.api.length-1].id +1 : 1,
       Firstname: req.body.Firstname,
       Lastname : req.body.Lastname
   }
   if(!postdata.Firstname || !postdata.Lastname){
     return res.status(404).json({"message" : "Error : Value can't be empty"})
   }
    data.newdata([...data.api,postdata]);
    res.json(data.api);
 }

 const putData = (req,res)=>{
    const updateid = data.api.find(dta => dta.id === parseInt(req.body.id))
    if(!updateid) return res.status(400).json({"Message":" Error : Id not exsist to update"});
     if(req.body.Firstname) updateid.Firstname = req.body.Firstname
     if(req.body.Lastname) updateid.Lastname = req.body.Lastname
     
   const filterdata = data.api.filter(dta => dta.id !== updateid.id)
   const mergedata = [...filterdata,updateid];
   data.newdata(mergedata.sort((a,b)=> a.id > b.id ? 1 : -1))
   res.json(data.api)
  }

  const deleteData = (req,res)=>{
    const deleteid = data.api.find(dta => dta.id === parseInt(req.body.id))
    if(!deleteid) return res.status(400).json({"Message":" Error : Id not exsist to delete"});
     const deletedata = data.api.filter(dta => dta.id !== parseInt(req.body.id));
     data.newdata(deletedata)
     res.json(data.api);
  }

  const getById = (req,res)=>{
    const uid = parseInt(req.params.id);
    const exist = data.api.find(user => user.id == uid);
    if(exist){
      res.json(exist);
    }
    else{
      res.send(`<h1>Error : Not Found</h1>`);
    }
    }

  module.exports = { apiData, postData, putData, deleteData, getById };