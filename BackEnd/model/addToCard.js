const mongoose = require('mongoose')
const AddToCardScheme =  mongoose.Schema({
  
    admin_id:
    {
        type:String,
        required:true,
    },
    product_id:
    {
        type:String,
        required:true,
    },
   
    name:
    {
        type:String,
        required:true
    },
    price:
    {
        type:String,
        required:true,
    },
    quantity:
    {
        type:Number,
        default:1
    },
    original_price:
    {
        type:String,
        required:true
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

const AddToCardModel = mongoose.model('addtocard',AddToCardScheme)
module.exports = AddToCardModel
