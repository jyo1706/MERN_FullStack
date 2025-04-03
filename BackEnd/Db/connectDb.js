const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017'
const connectDb = ()=>
{
    
        return mongoose.connect(url)
        .then(()=>console.log("Db connect successfully")).catch((error)=>{console.log(error)})
  
}
module.exports = connectDb
