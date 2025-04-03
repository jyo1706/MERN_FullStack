const mongoose = require('mongoose')
// const url = 'mongodb://127.0.0.1:27017/Mern'
live_url = "mongodb+srv://jyotiuser:jyoti1706@cluster0.j4lrbou.mongodb.net/Mern?retryWrites=true&w=majority"
const connectDb = ()=>
{
    
        return mongoose.connect(live_url)
        .then(()=>console.log("Db connect successfully")).catch((error)=>{console.log(error)})
  
}
module.exports = connectDb
