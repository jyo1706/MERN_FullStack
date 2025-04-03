
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ResetPassword() {

  const navigate = useNavigate()
   const[getError,setGetError] = useState('')
   const params = useParams()
   
 const submitEmail = ((e)=>
  {
   
    e.preventDefault()
    const data = e.target;
    const form = new FormData(data)
    const formData = Object.fromEntries(form.entries())
    // console.log(formData)
     axios.post(`http://localhost:4000/resetPassword/${params.id}`,formData)
     .then((res)=>{if(res.data.message=="Password Reset Successfully")
      Swal.fire({
                            title: 'Password Reset Successfully',
                            icon: 'success',
                          
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'ok!',
                         });
      {navigate('/login')}}).catch((err)=>setGetError(err.response.data.message))
  })
  return (
    <>
     <div className="main">
    <div className="bg-white container login-container res-container pt-1 p-3">
      
    
      {/* Form Start */}
       <div className="form-container" method='post'>
      
       <h3 className="heading" style={{marginBottom:"50px"}}>Forget Password</h3>

       {getError!=='' && <div className='errorHeader'><p className="backendError">{getError}</p></div>}

       <form onSubmit={submitEmail} method='post'>
        <div className="pt-1 p-5 form-inner-container">
          {/* prev otp field start*/}
          <div  className="">
            <input
              type='text'
              name="otp"
              placeholder="Verify otp"
              autoComplete="off" 
            />
         </div>
           {/* prev otp field start*/}
           <div  className="">
            <input
              type='password'
              name="password"
              placeholder="Enter Password"
              autoComplete="off" 
            />
         </div>
         <div  className="">
            <input
              type='password'
              name="confirm_password"
              placeholder="Enter Confirm_password"
              autoComplete="off" 
            />
         </div>

        <div className="">
              <button className="form-button" type='submit'>
                Submit 
              </button>
        </div>
        </div>
      </form>
         
       </div>
      {/* Form end */}
    </div>
   </div>
    </>
  )
}

export default ResetPassword