const RegistrationModel = require("../model/registration")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const nodemailer = require('nodemailer')
const OtpModel = require("../model/resetpassword")

class AdminController
{
     
    static res = async(req,res)=>{
        
        try 
        {
            // console.log("hello")
            // console.log(req.body)
        const {name,email,city,mobile,password,confirm_password}=req.body
        const checkEmail= await RegistrationModel.findOne({email:email})
        console.log(checkEmail)
        const hashPassword =  await bcrypt.hash(password,10)
        const hashConfirmPassword = await bcrypt.hash(confirm_password,10)
      
        if(checkEmail)
        {
            res.status(409).json({message:'Email Already Exit',status:409})
           
            
        }
       else
        {
            const result = new RegistrationModel(
                {
    
                   name:name,
                   email:email, 
                   city:city,
                   mobile:mobile,
                   password:hashPassword,
                   confirm_password:hashConfirmPassword
                })
                await result.save()
                res.status(200).json({message:'Registration successfully',status:200})
        }
     
        } catch (error) {
            console.log(error)
        }
    }
    static login = async(req,res)=>
    {
            try {

                // res.clearCookie('tokens')

                const { email, password } = req.body;
                const [data] = await RegistrationModel.find({ email: email });
        
                if (data && password.length >= 4) {
                    const convertPassword = await bcrypt.compare(password, data.password);
        
                    if (!convertPassword) {
                        return res.status(401).json({ message: 'Password incorrect', status: 401 });
                    }
        
                    const token = jwt.sign({ ID: data._id }, "##user##1706");
                    // console.log('login',token);
        
                    // Set token in cookie
                    res.cookie("token", token, {
                        // expires: new Date(Date.now() + 25892000000),  // Cookie expiration (30 days)
                        // httpOnly: true,  // Prevent access from JavaScript (XSS protection)
                        
                        // sameSite: 'Lax', // Prevent cross-site requests
                        // secure: true,

                          // Cookie expiration (30 days)
                          httpOnly: true,  // Prevent access from JavaScript (XSS protection)
                         secure: process.env.NODE_ENV === "production",  // Secure cookie only in production
                        sameSite: 'None', // Allow cross-site requests
                    });
                   

                    return res.status(200).json({ message: 'Login successfully', status: 200,data:data});
                } else {
                    return res.status(400).json({ message: 'Email not Registered', status: 400 });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Server error', status: 500 });
            }
        }
    static logout = async(req,res)=>
    {
        try 
        {
          res.clearCookie('token'); // Clear cookie for each matched name
          res.status(200).json({message:'logout'})

        } 
        catch(error) {
            console.log(error)
        }
    }
    static forgetPassword = async(req,res)=>
    {
        
        try
        {    
            const exp = /^[a-zA-Z0-9]+@+[a-zA-Z]+.[a-zA-Z]{2,}$/;
            const{email} = req.body
            //  console.log(email)
            const findMail =  await RegistrationModel.findOne({email:email})
         if(email)
         {
            if(!exp.test(email))
                {
                   res.status(401).json({message:"Plz Enter in right format",status:401})
                }
                else
                {
                  if(findMail)
                      {
                        // res.status(200).json({message:'Email Register',status:200})
                        //Otp generate
                        const otp = Math.floor(Math.random()*1000000)
                         const storeOtp  = new OtpModel({
                            otp:otp,
                            email:findMail.email
                         })
                     // find email for save otp  
         
                    const findOtp = await OtpModel.findOne({email:email})  
                       if(!findOtp)
                          {
                              storeOtp.save()   //save otp in OtpModel
                            const id = storeOtp.id
                            res.status(200).json({message:'Email Register',status:200,id:storeOtp.id})  
                            let transporter = nodemailer.createTransport
                            ({
                                host: "smtp.gmail.com",
                                port: 587,
                               
                                
                                  auth: 
                                    {
                                        user: 'jsharma921706@gmail.com', // generated ethereal user
                                        pass: 'ardfpbqxreruxxrw' // generated ethereal password
                                    }
                            });
                                // send mail with defined transport object
                                    let info = await transporter.sendMail
                                    ({
                                      from: 'jsharma921706@gmail.com', // sender address
                                      to: findMail.email, // list of receivers
                                      subject: "Reset Password", // Subject line
                                      text: "Otp for Reset Passoword", // plain text body
                                      html: `<h2>Otp for Forget Passoword<h2><b>Otp:${otp}<b>`, // html body
                                    });
                            // delete Otp after 5 mins
                             setTimeout(async()=>
                            {
                              try 
                              {
                                const deleleOtp = await OtpModel.findByIdAndDelete(id)
                                
                              } 
                              catch (error) 
                              {
                                console.log(error)
                              }
                             },1*60*1000)
                             //  sent Otp in email
                        
                             
                                
                        }
                            
                          
                        else
                        {
                            res.status(401).json({message:'Otp Already Sent',status:401})
                        }
                    }
                      else
                      {
                          res.status(401).json({message:'Email not Register',status:401})
                      }
                }
         }
         else{
            res.status(401).json({message:"Plz enter Email"})
         }
        }
        catch(err)
        {
            console.log(err)
        }

    }
    static resetPassword = async(req,res)=>
    {
        try 
        {
          const {otp,password,confirm_password} = req.body
          // verify Otp
          const otpVerify = await OtpModel.findById(req.params.id)
          const num = /^\d+$/
         if(otp && password && confirm_password)
         {
            if(otpVerify)
                {
                    if(otpVerify.otp==otp)
                        {
                            if(password.length<4)
                                {
                                     res.status(401).json({message:"password to short",status:401})
                                }   
                                else
                                {
                                    if(password===confirm_password)      
                                        {
                                            const hashPassword = await bcrypt.hash(password,10)
                                            const hashConfirmPassowrd= await bcrypt.hash(confirm_password,10)
                                            const findIdByEmail = await RegistrationModel.findOne({email:otpVerify.email})
                                            const UpdatePassword = await RegistrationModel.findByIdAndUpdate(findIdByEmail.id,{
                                                password:hashPassword,
                                                confirm_password:hashConfirmPassowrd
                                            })
                                            await UpdatePassword.save()
                                            
                                            res.json({message:"Password Reset Successfully"})
                                        }
                                        else
                                        {
                                          res.status(401).json({message:'password and Conform_Password not match',status:401})
                                        }
                                } 
                        }  
                    else
                    {
                         res.status(401).json({message:"Wrong Otp",status:401})
                    }
                }
                   
                else
                {
                  res.status(401).json({message:"Otp Expire",status:401})
                }
         }
         else
         {
            res.status(401).json({message:"Required all Field",status:401})
         }
        }
         catch (error) 
         {
         console.log(error)   
        }
    }
    static header = async(req,res)=>
    {
       const user =  req.data
       res.send(user)
    }
}
module.exports= AdminController 
