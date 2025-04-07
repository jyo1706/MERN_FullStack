import  { useContext, useEffect, useState } from 'react'
import '../../../assets/payment.css'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TotalPrice from './TotalPrice';
import { BtnContext, PaymentContext, PaymentMethod, QuantityContext } from '../../Hooks/useContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import BuyNow from './BuyNow';
import { faCheck} from '@fortawesome/free-solid-svg-icons';
import { totalData } from '../../Hooks/useQuantity';


function Payment() 
{
const [method,setMethod] = useState(false)
const {paymentDispatch} = useContext(PaymentContext)
const {btnDispatch,btnState} = useContext(BtnContext)
const {paymentMethodDispatch} = useContext(PaymentMethod)
const {quantityState,quantityDispatch} = useContext(QuantityContext)
const {paymentMethodState} = useContext(PaymentMethod)
const params = useParams()
const navigator = useNavigate()
const productId = params.id 
const[pay,setPay] = useState(false)
const[creditCard,setCreditCard] = useState(false)

useEffect(()=>
{
  paymentDispatch({type:'payment',payload:false})
  btnDispatch({type:'btn',payload:false})
},[])
useEffect(()=>{
  axios.get(`https://mern-fullstack-1-j3k1.onrender.com/buyNow/${productId}`, {
  withCredentials: true, // This sends cookies with the request
}).then((res)=>
  {
        setData(res.data.data)
       
  }
)
.catch((err)=>
{
  navigator('/login')
console.log(err)})
},[])
useEffect(()=>
  {
     axios.get('https://mern-fullstack-1-j3k1.onrender.com/findAddress',{withCredentials:true}).then((res)=>{setfindAddress(res.data.data[0])}).catch((err)=>console.log(err))
  },[])

const [data , setData ] = useState([]);
const page = localStorage.getItem('page')
const[findAddress,setfindAddress] = useState()
const quantity = Object.values(quantityState)

const price = data && data.price
const id = data && data._id
const obj = {paymentMethodState,id,quantity}
const original_price = data && data.original_price
const totalDiscount = Math.ceil(price * Object.values(quantityState).map(quantity => quantity === 0 ? 1 : quantity).reduce((acc, curr) => acc * curr, 1)*original_price/100)
const totalPrice = price * Object.values(quantityState).map(quantity => quantity === 0 ? 1 : quantity).reduce((acc, curr) => acc * curr, 1)-Math.ceil(price * Object.values(quantityState).map(quantity => quantity === 0 ? 1 : quantity).reduce((acc, curr) => acc * curr, 1)*original_price/100)

const placeOrder=(()=> {
  if(paymentMethodState!=undefined)
  {
   
    
      if(paymentMethodState==='Online Payment')
      {
            const option = {
              key:'rzp_test_zFG2soycp0tt1P',
              amount:totalPrice*100,
              currency:'INR',
         
              handler:function(res)
              {
                Swal.fire({
                      title: 'Payment Done and order place successfully',
                      icon: 'success',
                    
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'ok!',
                   });
                   axios.post(`https://mern-fullstack-1-j3k1.onrender.com/placeOrder/${findAddress._id}`,obj,{withCredentials:true})
                   .then((res)=>{navigator('/');
                    localStorage.removeItem('page'); quantityDispatch({type:'reset'});}).catch((err)=>console.log(err.message))
                   }  
                
              }
              const rzp = window.Razorpay(option);
            rzp.open()
            rzp.on('payment fail',function(res)
              {
                Swal.fire({
                  title: 'Payment Failed',
                  icon: 'success',
                
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'ok!',
               });
          })
        
       }
       else
       {
        axios.post(`https://mern-fullstack-1-j3k1.onrender.com/placeOrder/${findAddress._id}`,obj,{withCredentials:true})
        .then((res)=>{navigator('/');
          localStorage.setItem('order','Order Place Successfully')
          const order = localStorage.getItem('order')
         Swal.fire({
          title: order,
          icon: 'success',
        
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ok!',
       });
       localStorage.removeItem('order')
         localStorage.removeItem('page'); quantityDispatch({type:'reset'});}).catch((err)=>console.log(err.message))
         
         // axios.get('https://mern-fullstack-1-j3k1.onrender.com/deleteProductFormAddToCard',{withCredentials:true})
       }    
      
    

  }

  else
  {
    Swal.fire({
      title: 'Plz Select Payment Method',
      icon: 'warning',
 
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ok!',
   });
  }
})

  return (
<>
{ page === 'buynow' &&  
  <div className='review'>
        <div className='text-center'>
               <h6><FontAwesomeIcon className = 'icon' icon={faCheck} style={{color:"#325b86",fontSize:'14px',fontWeight:'700'}}/></h6>
               <label>Review</label>
        </div>
        <div style={{color:'#325b86',fontSize:'10px',marginTop:'-10px'}}>
          _____________________________________________
        </div>
        <div className='text-center'>
          <div className=''>
               <h6  style={{color:'#325b86', borderColor:' #325b86'}}>2</h6>
               <label>Payment</label>
          </div>
          
        </div>
    
 </div>
}
   
  <div className='productDetailContainer container'>
     <div className='product'>  
                <div className=''>
                   <h1>Select Payment Method</h1>
                 <div className='paymentContainer mt-3'>
                   <div className='payment'>
                     {/* <h1>₹{TotalPrice(data)}</h1> */}
                     <div className='cashOnDelivery'>
                        <h1>Cash On Delivery</h1>
                        <img src='	https://static-assets.meesho.com/videos/cod_icon_v2.gif'/>
                     </div>
                   </div>
                 
                   <input type="radio" name='payment'  onChange={()=>{setMethod(),paymentMethodDispatch({type:'payment',payload:'Cash On Delivery'})}}/>
                 </div>
                 {/* **************************Online Payment Method Start**************************** */}
                 <div className='payOnline mt-3'>
                  <div className='paymentContainer' style={{border:"none"}}>
                  <div className='payment'>
                     {/* <h1>₹{totalPrice(data,quantities)-parseInt(totalPrice(data,quantities)*10/100)}</h1> */}
                     <div className='cashOnDelivery'>
                        <h1>Pay Online</h1>
                        {/* Payment Image Slider Start */}
                         {/* <div className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="20000">
                                  <img src="https://pbs.twimg.com/profile_images/1615271089705463811/v-emhrqu_400x400.png" alt="phonePe"/>
                                </div>
                                <div className="carousel-item" data-bs-interval="20000">
                                  <img src="https://play-lh.googleusercontent.com/B5cNBA15IxjCT-8UTXEWgiPcGkJ1C07iHKwm2Hbs8xR3PnJvZ0swTag3abdC_Fj5OfnP" alt="Google Pay"/>
                                </div>
                                <div className="carousel-item" data-bs-interval="20000">
                                  <img src="https://wayne.bank/wp-content/uploads/2023/03/Google-Pay-Card-Image.png" alt="Google Pay"/>
                                </div>
                         </div>
                         </div> */}
                        {/* Payment Image Slider End */}
                    </div>
                   </div>
                       <input type="radio" name='payment' className='inputTag' onChange={()=>{setMethod(true),paymentMethodDispatch({type:'payment',payload:'Online Payment'})}}/>
                   
                  </div>
                 </div>
                 </div>
                   {/* <h6 style={{color:"grey",marginLeft:"20px"}}>Extra discount with bank offers</h6> */}
                   {/* ******************************* Online Method Div Start******************************* */}
                     {/* {
                        method && 
                      <div className='paymentMethodContainer'>
                        <div className=' mb-2 paymentMethod d-flex align-items-center justify-content-between' >
                          <div className='payment'>
                             <h6>Pay by any UPI App</h6>
                          </div>
                         <div className=''>
                         <FontAwesomeIcon icon={faChevronDown}/> 
                         </div>
                        </div>
                        <div className=' mb-2 paymentMethod d-flex align-items-center justify-content-between' onClick={()=>{setPay((prev)=>!prev);setCreditCard(false)}} >
                          <div className='payment'>
                             <h6 >Debit & Credit Cards</h6>
                          </div>
                         <div className=''>
                          <FontAwesomeIcon icon={faChevronDown} /> 
                         </div>
                          
                       </div>
                       {  pay  && <div className=' mb-2 paymentMethod d-flex align-items-center justify-content-between'>
                       <div className='payment'>
                           <h4 style={{fontSize:'15px',color:'#325b86'}} onClick={()=>{setCreditCard((prev)=>!prev);setPay((prev)=>!prev)}}>Add New Card +</h4> 
                       </div>
                       
                       </div>
                       }
                       <div className='mb-2 paymentMethod d-flex align-items-center justify-content-between'>
                        {/* credit card form Start */}
                         {/* {creditCard &&  <form className='creditCard'>
                            <div className='payment'>
                              <input type='text' name='cardNumber' placeholder='Enter Card Number' required/>
                            </div>
                            <div className='payment'>
                              <input type='text' name='month' placeholder='MM' required/>
                              <input type='text' name='year' placeholder='YY' required/>
                            </div>
                            <div className='payment'>
                              <input type='text' name='cvv' placeholder='CVV' required/><br></br>
                              
                            </div>
                            <h6 style={{fontSize:'10px',color:'grey',marginTop:'-13px'}}>3-digit code behind your card</h6>
                             <div className='d-flex justify-content-end'>
                             <button className='btn btn-primary' onClick={()=>placeOrder()}>Verify</button>
                             <button className='btn btn-primary mx-2'>Cancel</button>
                             </div>
                          </form>
                         } */}
                        {/* credit card form end */}
                        {/* </div>
                       <div className=' mb-2 paymentMethod d-flex align-items-center justify-content-between' >
                          <div className='payment '>
                             <h6>NetBanking</h6>
                          </div>
                         <div className=''>
                         <FontAwesomeIcon icon={faChevronDown}/> 
                         </div>
                       </div>
                         
                    </div>
                     } */} 
                     {/* *******************************Online Method Div End******************************* */}
                 {/* </div> */}
                 {/* **************************Online Payment Method End**************************** */}
                {/* </div> */}
    </div>
    <div className=''>
           {page==='addToCard' && <TotalPrice/>}
            
          {page==='buynow' && <div className=''>
          <div className="total">
          <div className="totalContainer">
            <h4>Product Detail</h4>
            <div className="totalPrice">
              <h5 style={{borderBottom:'2px dotted grey'}}>Total Product Price:</h5>
              <span >+ ₹{price * Object.values(quantityState).map(quantity => quantity === 0 ? 1 : quantity).reduce((acc, curr) => acc * curr, 1)}</span> 
        
            </div>
            <div className="totalPrice mb-0" style={{color:'green'}}>
              <h5 style={{color:'green',borderBottom:'2px dotted green'}}>Total Discount</h5>
              <span>-₹{totalDiscount}</span> 
            </div>
            <hr />
            <div className="order">
              <h5>Order Total:</h5>
             <span>₹{totalPrice}</span>
            </div>
          
           
              <div>
              <h6 className="text-center text-success">
                  You Save : 
                </h6>
                <span className="btnHeading">
                  Clicking on 'Continue' will not deduct any money
                </span>
   
                 {<form action={placeOrder} method='post'> <button className="form-button d-block my-2 conBtn" onClick={()=>localStorage.getItem('BuyNow')}>Continue</button></form>}
     
              </div>
           
          </div>
        </div>
          </div> }
    </div>
  </div>
</>
  )
}

export default Payment
