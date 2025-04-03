const jwt = require('jsonwebtoken')


const isLogin = async(req,res,next)=>
{
    try{
      // console.log('hello auth');
          const {token} = req.cookies
      // console.log(token)
          if(token)
         {
            console.log(token)
         }
         next()
    }
    catch(error)
    {
       console.log(error)
    }
}
module.exports = isLogin