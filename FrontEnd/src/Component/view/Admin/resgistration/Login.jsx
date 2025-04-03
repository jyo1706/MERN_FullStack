import {useContext, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import validation from "../../../Hooks/Validation";
import { UserContext } from "../../../Hooks/useContext";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";


const Login = ({setUserName}) => {
  const [eye, setEye] = useState("password");
  const[formValidation,setFromValidationData] = useState({})
  const[getError,setGetError] = useState('')
  const {loginState,loginDispatch}= useContext(UserContext)

  const navigation = useNavigate()


//form onsubmit function
   const setData =  ((e)=>
  {
     e.preventDefault();
      const form = e.target
      const formData = new FormData(form);
      const formObj= Object.fromEntries(formData.entries())
      let error =  validation(formObj)
      
      // validation function
      setFromValidationData(error) 
      
      //Sent data to backend
      
           axios.post('https://mern-fullstack-1-j3k1.onrender.com/login',formObj, {
            withCredentials: true, // This sends cookies with the request
          }).then((response)=>
            
          {  
            localStorage.setItem('username',response.data.data.name)
            localStorage.setItem('role',response.data.data.role)
            if(response.data.data.role==='admin')
            {
              navigation('/displayData');
            }
            if(response.data.data.role==='user')
              {
                navigation('/')
              }
             
             
          }).catch((err)=>{
            console.log(setGetError(err.response.data.message));
            toast.error(err.response.data.message)})
    })
    //Eye Validation
  const eyeHandler = () => {
    eye == "password" ? setEye("text") : setEye("password");
  };
  useEffect(()=>
  {

  loginDispatch({type:'user',payload:false})
    const user = localStorage.getItem('username')
    if(user)
    {
      navigation('/')
      // if(user) {
      //   loginDispatch({ type: "user", payload: true });
      // } else {
      //   loginDispatch({ type: "user", payload: false });
      // }
    }
  })

 

  return (
   <>
 
    <div className="main">
      <div className="bg-white container login-container res-container pt-1 p-3">
        
      
        {/* Form Start */}
         <div className="form-container">
        
         <h3 className="heading" style={{marginBottom:"30px"}}>Login</h3>
         {/* {getError!=='' && <p className="backendError container">{getError}</p>} */}
         <form onSubmit={setData} method="post">
          <div className="pt-1 p-5 form-inner-container">
            {/* Email field start*/}
            <div className="">
              <input
                type="text"
                name="email"
                placeholder="example@gmail.com"
                
              />
              </div>
              {formValidation.email && (
                <p className="text-danger validation">
                  <i>{formValidation.email}</i>
                </p>
              )}
            
             
             {/* Password field start*/}
            <div  className="password">
              <input
                type={eye}
                name="password"
                placeholder="password"
                autoComplete="off" 
              />
              {formValidation.password && (
                <p className="text-danger validation">
                  <i>{formValidation.password}</i>
                </p>
              )}
              <svg className="" id="passwordEye" onClick={ eyeHandler } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
            </div>
            {/* Password field end*/}
            <div className="text-center d-flex flex-column text-decoration-none">
                <Link to="/forgetpass"><span className="">Forget Password</span></Link>
                <Link to="/registration"><span className="">Signup</span></Link>
            </div>
          <div className="">
         <button className="form-button" type="submit">
                Submit 
              </button>
          </div>
          </div>
        </form>
        
         </div>
         
        {/* Form end */}
        
      </div>
      <ToastContainer  position="top-center" // Fallback position
         />
    </div>
   </>
  );
};

export default Login;
