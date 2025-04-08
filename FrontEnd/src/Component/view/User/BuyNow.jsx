import axios from 'axios'
import  {useContext, useEffect, useState } from 'react'
import {  Link, useNavigate, useParams} from 'react-router-dom'
import '../../../assets/buyNow.css'
import '../../../assets/addtocard.css'
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BtnContext,   QuantityContext } from '../../Hooks/useContext';
import Swal from 'sweetalert2';


function BuyNow() {
 
   
    const navigator = useNavigate()
    const {quantityState,quantityDispatch} = useContext(QuantityContext)
    const {btnDispatch} = useContext(BtnContext)
    const params = useParams()
    const productId = params.id 
    const[findAddress,setfindAddress] = useState()
    
    
    useEffect(() => {
      btnDispatch({type:'btn',payload:true})
    
      localStorage.setItem('page','buynow')
    }, []);

// *****************************User Products *****************************
    useEffect(()=>{
        axios.get(`https://mern-fullstack-1-j3k1.onrender.com/buyNow/${productId}`, {
        withCredentials: true, // This sends cookies with the request
      }).then((res)=>
        {
          if(res.data.user.role==='admin')
          {
            Swal.fire({
              title: 'user page',
              icon: 'warning',
         
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'ok!',
         })
           navigator(window.history.back())
          }

          else
          {
            setData(res.data.data)
          }
         
        
          
              
              
        }
      )
    .catch((err)=>
      {
        navigator('/login')
      console.log(err)})
  },[])
//********************************Find Adrress *****************************
  useEffect(()=>
{
   const id = localStorage.getItem('id')
   
   if(!id)
   {
    axios.get('https://mern-fullstack-1-j3k1.onrender.com/findAddress',{withCredentials:true}).then((res)=>{setfindAddress(res.data.data[0])}).catch((err)=>console.log(err))
   }
   else
   {
    axios.get(`https://mern-fullstack-1-j3k1.onrender.com/findAddress/${id}`,{withCredentials:true}).then((res)=>{setfindAddress(res.data.data)}).catch((err)=>console.log(err))
    localStorage.removeItem('id')
   }
   
},[])


// *******************USESTATE*******************

  const [data , setData ] = useState([]);
  const price = data && data.price
  const original_price = data && data.original_price
  const id = data && data._id
  const image = data && data.image
  

    
return (
    
    <>
   
     <div className='review'>
        <div className='text-center'>
               <h6>1</h6>
               <label>Review</label>
        </div>
        <div style={{fontSize:'10px',marginTop:'-10px',color:'grey'}}>
          _____________________________________________
        </div>
        <div className='text-center'>
          <div className=''>
               <h6>2</h6>
               <label>Payment</label>
          </div>
          
        </div>
    
     </div>
    {
      (image && findAddress) &&
    
    <div className='productDetailContainer container'>
          <div className='product'>  
             <div className=''>
                <h1>Product Detail</h1>
               
                  <div className='productItem'>

                    <div className='productImg'>
                       <img src={image.url} alt=''/>
                    </div>
                    <div className='productDetail'>
                      <h5>{data && data.name}</h5>
                        <span>₹{Math.round(price-(price*original_price/100))}</span>  
                         <div className='offer px-1'><del><span>{price}</span></del></div>
                         <div className='offer' style={{color:'green', fontWeight:'500'}}><span>{original_price}off</span></div>
                         <div className='quantity m-3 mt-0 mb-0'>
                          <span>Quantity:</span>
                            <div className='quantityBtn' style={{marginLeft:"10px"}}>
                                  <button className='btn' onClick={() => {quantityDispatch({type:'decrement', payload:id});}}><span className='text-black'>-</span></button>
                                     <span>{quantityState[id] || 1}</span>
                                  <button className=' btn' onClick={() => {quantityDispatch({type:'increment', payload:id});}}><span className='text-black'>+</span></button>
                            </div>
                      </div>
                     
                    </div>
                  </div>
                  <div className='address mt-5'>
                      <div className='addressHeading'>
                       
                           <div><FontAwesomeIcon style={{fontSize:"30px"}} icon = {faLocationDot}></FontAwesomeIcon> <h3>Delivery Address</h3></div>
                           <Link to={`/addAddress/${productId}`}><h6 onClick={()=>{localStorage.setItem('BuyNow','false')}}>Change</h6></Link>
                      
                      </div>
                      <div className='addressDetail'>
                         <h5>{findAddress.name}</h5>
                         <h6>{findAddress.address.house_no},{findAddress.address.area},{findAddress.address.state},{findAddress.address.pincode}</h6>
                         <h6>{findAddress.mobile}</h6>
                      </div>
                  </div>
              </div>
          </div>
          <div className=''>
          <div className="total">
          <div className="totalContainer">
            <h4>Product Detail</h4>
            <div className="totalPrice">
              <h5 style={{borderBottom:'2px dotted grey'}}>Total Product Price:</h5>
              <span >+ ₹{price * Object.values(quantityState).map(quantity => quantity === 0 ? 1 : quantity).reduce((acc, curr) => acc * curr, 1)}</span> 
        
            </div>
            <div className="totalPrice mb-0" style={{color:'green'}}>
              <h5 style={{color:'green',borderBottom:'2px dotted green'}}>Total Discount</h5>
              <span>-₹{Math.ceil(price * Object.values(quantityState).map(quantity => quantity === 0 ? 1 : quantity).reduce((acc, curr) => acc * curr, 1)*original_price/100)}</span> 
            </div>
            <hr />
            <div className="order">
              <h5>Order Total:</h5>
             <span>₹{price * Object.values(quantityState).map(quantity => quantity === 0 ? 1 : quantity).reduce((acc, curr) => acc * curr, 1)-Math.ceil(price * Object.values(quantityState).map(quantity => quantity === 0 ? 1 : quantity).reduce((acc, curr) => acc * curr, 1)*original_price/100)}</span>
            </div>
          
           
              <div>
              <h6 className="text-center text-success">
                  You Save : 
                </h6>
                <span className="btnHeading">
                  Clicking on 'Continue' will not deduct any money
                </span>
              <Link to={`/payment/${productId}`}><button className="form-button d-block my-2 conBtn">Continue</button></Link>
                    
     
              </div>
           
          </div>
        </div>
          </div>
    </div>
    
    }
 
   
    </>
  )
}

export default BuyNow

