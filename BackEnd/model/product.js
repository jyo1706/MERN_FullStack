const mongoose = require('mongoose')
const ProductScheme =  mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    des:
    {
        type:String,
        required:true,
    },
    price:
    {
        type:String,
        required:true,
    },
    quantity:
    {
        type:String,
        required:true
    },
    original_price:
    {
        type:String,
        required:true
    },
    deliveryCharge:
    {
       type:String,
       required:true,
    },
    image:
    {
        public_id:{
            type:String
        },
        url:
        {
            type:String
        }

    }
},{timestamps:true})

const productModel = mongoose.model('products',ProductScheme)
module.exports = productModel
