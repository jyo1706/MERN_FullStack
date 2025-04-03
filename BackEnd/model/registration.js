const  jwt  = require('jsonwebtoken')
const mongoose  = require('mongoose')
const registrationSchema = mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
    },
    city:
    {
        type:String,
        required:true,
    },
    mobile:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    confirm_password:
    {
        type:String,
        required:true
    },
    role:
    {
        type:String,
        default:"user"
    },
    // tokens:[
    //    {
    //     token:{
    //         type:String,
    //       required:true
    //    }
    //    }
    // ]
},{timestamps:true})


// registrationSchema.methods.generateAuthToken = async function()
// {
//    try 
//    {
//     let token = jwt.sign({ID:this._id},"userlkjlsdjflsjflsfjklsjfl")
//     console.log(this._id)
//     this.tokens = this.tokens.concat({token:token})
//     await this.save()
//     return token 
//    } 
//    catch (error) 
//    {
//       console.log(error) 
//    }
// }
const RegistrationModel = mongoose.model('registration',registrationSchema)
module.exports = RegistrationModel