const mongoose = require('mongoose')
const addressSchema = mongoose.Schema({
    admin_id:
    {
        type:String,
        required:true,
    },
    name:
    {
        type:String,
        required:true
    },
    address:
    {
        house_no:
        {
            type:String,
            required:true,
        },
        area:
        {
            type:String,
            required:true,
        },
        pincode:
        {
            type:String,
            required:true
        },
        state:
        {
            type:String,
            required:true
        },
       
    },
    mobile:
    {
        type:String,
        required:true
    }
},{timestamps:true})
const addressModel = mongoose.model('address',addressSchema)
module.exports = addressModel