import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuantity } from '../../Hooks/useQuantity';
import Swal from 'sweetalert2';
import { BtnContext,  CartLength,  PaymentContext, PaymentMethod, QuantityContext } from '../../Hooks/useContext';
import { cartReducer } from '../../Reducer/reducer';
import Loader from 'rsuite/esm/Loader';

function TotalPrice() {
  const params = useParams();
  const productId = params.id;
  const navigator = useNavigate();
  const { totalDiscount, totalPrice} = useQuantity();

  const [loading, setLoading] = useState(true);      // Loading state
  const [error, setError] = useState(null);          // Error state
  const{btnState,btnDispatch}  =   useContext(BtnContext)
  const{paymentState} = useContext(PaymentContext)
  const {quantityState} = useContext(QuantityContext)
  const {paymentMethodState} = useContext(PaymentMethod)
  const {cartDispatch} = useContext(CartLength)

  
  // Fetch data on component mount
  useEffect(() => {
    axios
      .get(`https://mern-fullstack-1-j3k1.onrender.com/addTocard`, {
        withCredentials: true, // This sends cookies with the request
      })
      .then((res) => {
          setData(res.data); // Set the fetched data
          setLoading(false); // Set loading to false after data is fetched
         
      })
      .catch((err) => {
        setLoading(false); // Set loading to false if there was an error
        setError(err.message); // Set the error message
        console.log(err);
        navigator('/login');
      });
  }, [productId, navigator]);
          // Changed initial state to null for better checking
  //UPDATE QUANTITY METHOD
  function updateQuantity()
  {
  
   if(Object.keys(quantityState).length>0)
   {
    axios.post('https://mern-fullstack-1-j3k1.onrender.com/updateQuantity',quantityState,{withCredentials:true}).then((res)=>{}).catch((err)=>console.log(err))
   }
  }
  // If still loading, show a loading message
  // if (loading) {
  //   return  <div className='text-center mt-5'><Loader/></div>;
  // }

  // If there's an error, show the error message
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
//  METHOD FOR PLACE ORDER
 const placeOrder=(()=> {
  if(paymentMethodState!=undefined)
  {
    
      if(paymentMethodState==='Online Payment')
        {
              const option = {
                key:'rzp_test_zFG2soycp0tt1P',
                amount:totalDiscount(data.data)*100 ,
                currency:'INR',
                // order_id:res.order_id,
                handler:function(res)
                {
                  Swal.fire({
                        title: 'Payment Done',
                        icon: 'success',
                      
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ok!',
                     });
                     navigator('/');
                     localStorage.removeItem('page')
        axios.post(`https://mern-fullstack-1-j3k1.onrender.com/placeOrder/${productId}`,paymentMethodState,{withCredentials:true}).then((res)=>{
          cartDispatch({type:'cart',payload:true});
          if(res)
          {
             //  Method for delete Product for after order Place
                axios.get('https://mern-fullstack-1-j3k1.onrender.com/deleteProductFormAddToCard',{withCredentials:true})
          }
      })
      .catch((err)=>console.log(err))
        
          
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
       axios.post(`https://mern-fullstack-1-j3k1.onrender.com/placeOrder/${productId}`,paymentMethodState,{withCredentials:true}).then((res)=>{navigator('/');cartDispatch({type:'cart',payload:true});
      })
      .catch((err)=>console.log(err))
           const page = localStorage.get('page')
        if(page!='buynow')
        {
        axios.get('https://mern-fullstack-1-j3k1.onrender.com/deleteProductFormAddToCard',{withCredentials:true})
        }
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

     const [data, setData] = useState([]);     
  

 
  return (
      <>
   {
    
    data.data ?
      <div>
        <div className="total">
          <div className="totalContainer">
            <h4>Product Detail</h4>
            <div className="totalPrice">
              <h5 style={{borderBottom:'2px dotted grey'}}>Total Product Price:</h5>
              <span >+ ₹{totalPrice(data.data)}</span> 
        
            </div>
            <div className="totalPrice mb-0" style={{color:'green'}}>
              <h5 style={{color:'green',borderBottom:'2px dotted green'}}>Total Discount</h5>
              <span>-₹{totalPrice(data.data)-totalDiscount(data.data)}</span> 
            </div>
            <hr />
            <div className="order">
              <h5>Order Total:</h5>
             <span>₹{totalDiscount(data.data)}</span>
            </div>
            <div>
              <h6 className="text-center text-success">
                  You Save : {totalDiscount(data.data)-totalPrice(data.data)}
                </h6>
                <span className="btnHeading">
                  Clicking on Continue will not deduct any money
                </span>
              <Link to={`/addAddress/${productId}`}> {btnState && <button className="form-button d-block my-2 conBtn" onClick={()=>{btnDispatch({type:"btn",payload:false});updateQuantity()}}>Continue</button>}</Link> 
                      {<form action={placeOrder} method='post'>{paymentState===false && <button className="form-button d-block my-2 conBtn" onClick={()=>localStorage.getItem('BuyNow')}>Continue1</button>}</form>}
     
            </div>
          </div>
        </div>
      </div>
      :
      <div className='total h-25'>
        <div className='totalContainer'>
           <h4></h4>
            <div className="totalPrice">
              <h5 style={{borderBottom:'2px dotted grey'}}></h5>
              <span ></span> 
        
            </div>
            <div className="totalPrice mb-0" style={{color:'green'}}>
              <h5 style={{color:'green',borderBottom:'2px dotted green'}}></h5>
              <span></span> 
            </div>
            <hr />
            <div className="order">
              <h5></h5>
             <span></span>
            </div>
            <div>
              <h6 className="text-center text-success">
                 
                </h6>
                <span className="btnHeading">
                  Clicking on Continue will not deduct any money
                </span>
              <Link> </Link> 
                     
     
            </div>
        </div>
      </div>
   } 
    </>
  )
}


  
  
export default TotalPrice;
