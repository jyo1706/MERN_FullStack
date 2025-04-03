const mongoose = require('mongoose')
const OtpScheme =  mongoose.Schema({
    email:
    {
        type:String,
        required:true
    },
    otp:
    {
        type:String,
        required:true,
    },
    
},{timestamps:true})

const OtpModel = mongoose.model('passwordreset',OtpScheme)
module.exports = OtpModel
