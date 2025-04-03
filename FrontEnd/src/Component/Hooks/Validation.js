// login validation function
export default function validation(formData)
{
 
    let error={}
    const exp = /^[a-zA-Z0-9]+@+[a-zA-Z]+.[a-zA-Z]{2,}$/;
   
    // console.log(formData)
    
    try 
    {
      if (formData.email) 
      {
        if (!exp.test(formData.email)) 
        {
          error={ ...error, email: " plz enter valid email" }
        
        }
      }
      else
      {
        error= { ...error, email: " Plz Enter Email",password: " plz Enter password" }
        
      }
      if(formData.email=='')
      {
        error={...error,email:" plz enter email"}
      }
      if(formData.password=='')
      {
      
           error={...error,password:'email enter password'}
        
      }
      else
      {
        if(formData.password.length<4)
        {
          error = {...error,password:' password too short'}
        }
       
      }
      
      return error
    } 
    catch (error) 
    {
      console.log(error);
    }
  
  }

  // registration validation function
 export function resValidation(formData)
 {
   const exp =  /^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,}$/;
    const num = /^\d+$/
  //  const name =/^[a-zA-Z]{2,}$/
  //   const mobile =/^[0-9]{2,}$/
    let error = {}
       // Name Validation
       if(formData.name=='')
        {
          error = {...error,name:" plz enter name"}
        }
        
        //Email validation
        if(formData.email=='')
        {
          error={...error,email:" plz enter email"}
        }
       else
        {
          if(!exp.test(formData.email))
          {
            error = {...error,email:" plz enter valid email"}
          }
        }
          if(formData.city=='')
          {
            error={...error,city:" plz enter city"}
          }
          if(formData.mobile=='')
            {
              error={...error,mobile:' plz enter mobile number'}
            }
          
            else
            {
              if(!num.test(formData.mobile))
              {
                error = {...error,mobile:'Enter Only Numbers'}
              }
            }
         
            if(formData.password=='')
              {
                error = {...error,password:"plz enter password"}
              }
              else
              {
                if(formData.password.length<4)
                  {
                    error = {...error,password:' password too short'}
                  }
              }
              if(formData.confirm_password=='')
              {
                error={...error,confirm_password:"plz enter confirm password"}
              }
               if(formData.password!==formData.confirm_password)
                {
                  error={...error,confirm_password:'password & confirm are password not match '}
                }

              if(formData.confirm_password)
              {
                if(formData.confirm_password.length<4)
                  {
                    error = {...error,confirm_password:' password too short'}
                  }
              }
              
            
              
        // console.log(error)
       return error
       
 }