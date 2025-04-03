import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

import axios from 'axios';

function ForgetPassword() {
 const navigation = useNavigate()
 const[getError,setGetError] = useState('')

     const submitEmail= ((e)=>
      {
        e.preventDefault()
         const value = e.target;
        const form = new FormData(value)
        const formData = Object.fromEntries(form.entries())
         
         axios.post('http://localhost:4000/forgetPassword',formData)
         .then((res)=>{console.log(navigation(`/resetPassword/${res.data.id}`));}).catch((err)=>setGetError(err.response.data.message ))
       
       })
  return (
    <> 
    <div className="main">
    <div className="bg-white container login-container res-container pt-1 p-3">
      
    
      {/* Form Start */}
       <div className="form-container">
      
       <h3 className="heading" style={{marginBottom:"50px"}}>Forget Password</h3>
       {getError!=='' && <div className='errorHeader'><p className="backendError mb-5">{getError}</p></div>}
       <form onSubmit={submitEmail} method='post'>
        <div className="pt-1 p-5 form-inner-container">
          {/* prev password field start*/}
          <div  className="">
            <input
              type='text'
              name="email"
              placeholder="Enter Your Email"
              autoComplete="off" 
            />
         </div>
           
          
         

        <div className="">
              <button className="form-button">
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

export default ForgetPassword