const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    admin_id:
    {
        type:String,
        required:true,
    },
    productName:
    {
        type:Array,
        default:''
    },
    address:
    {
        type:Object,
        default:'',
    },
    paymentType:
    {
        type:String,
        default:'',
    },
   
},{timestamps:true})

const orderModel =  mongoose.model('orders',orderSchema)
module.exports = orderModel