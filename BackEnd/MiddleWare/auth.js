const jwt = require('jsonwebtoken')
const RegistrationModel = require('../model/registration')


const auth = async(req,res,next)=>
{   
    // console.log("hello")
    const token = req.cookies.tokens
    // console.log(token)
    try
    {
        if(token)                     
        {
            const verifytoken =  jwt.verify(tokens,"##user##1706")
            // console.log(verifytoken.ID)
            const data = await RegistrationModel.findOne({_id:verifytoken.ID})
              req.data =data
              next()
        }
        else
        {
           res.status(401).json({message:'unauth user',status:401})
        }
    }
    catch(error)
    {
        console.log(error)
    }
}

module.exports = auth

