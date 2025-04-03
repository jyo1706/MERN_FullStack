import axios from 'axios'
import  {useContext, useEffect, useState } from 'react'
import {  Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import '../../../assets/addtocard.css'
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TotalPrice from './TotalPrice'
import { BtnContext, CartLength, PaymentContext, QuantityContext } from '../../Hooks/useContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function AddToCard() {
 
    const navigator = useNavigate()
    const {quantityState,quantityDispatch} = useContext(QuantityContext)
    const {btnDispatch,btnState} = useContext(BtnContext)
    const {cartDispatch} =useContext(CartLength)
    const {paymentDispatch} = useContext(PaymentContext)
   

    useEffect(() => {
      btnDispatch({type:'btn',payload:true})
      paymentDispatch({type:'payment',payload:true})
  }, [navigator]);
    

// *****************************User All Products in cart*****************************
    useEffect(()=>{
        axios.get(`http://localhost:4000/addTocard`, {
        withCredentials: true, // This sends cookies with the request
      }).then((res)=>
        {
              setData(res.data)
         
        }
      )
    .catch((err)=>
      {
        navigator('/login')
      console.log(err)})
  },[])

// *****************************Delete Product from Cart Page*****************************
 
 const deleteProduct = (id)=>
  {
   
    axios.get(`http://localhost:4000/deleteProduct/${id}`, {
      withCredentials: true, // This sends cookies with the request
    }).then(()=>
    {
      Swal.fire({
        title: 'Product remove form cart',
        icon: 'warning',
   
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ok!',
  })
      navigator(0)
    }).catch((err)=>console.log(err))
  }
// *******************USESTATE*******************

  const [data, setData] = useState([]);

useEffect(()=>
{
  const length =  data.data && data.data.length
  cartDispatch({type:'cart',payload:length})
},[])

localStorage.setItem('BuyNow','true')
     
  
    
return (
  <>
    {
      data.data && data.data.length<1 ?
      <div className='container cartEmpty'><div className=''><h5 className='text-center'>Cart is empty</h5><Link to='/'><button className='btn btn-primary'>Continue Shopping</button></Link></div></div>
      :<div className='productDetailContainer container'>
          <div className='product'>  
             <div className=''>
                <h1>Product Detail</h1>
                {data.data &&  data.data.map((data1,inx)=>
                  <div className='productItem' key={inx}>

                    <div className='productImg'>
                      <img src={data1.image.url} alt=""/>
                    </div>
                    <div className='productDetail'>
                      <h5>{data1.name}</h5>
                      <span>₹{Math.ceil(data1.price-(data1.price*data1.original_price/100))}</span>   <div className='offer'><span><del>{data1.original_price}</del> off</span></div>
                      
                      <div className='quantity m-3 mt-0 mb-0'>
                          <span>Quantity:</span>
                            <div className='quantityBtn' style={{marginLeft:"10px"}}>
                                  <button className='btn' onClick={() => {quantityDispatch({type:'decrement', payload:data1._id});}}><span className='text-black'>-</span></button>
                                     <span>{quantityState[data1._id]||data1.quantity}</span>
                                        {/* <input type='text' name='quantity' value={quantityState[data1._id]||data1.quantity} style={{textAlign:'center',border:'none',padding:"0px",marginBottom:'0'}}/> Default quantity is 1 */}
                                   
                                 <button className=' btn' onClick={() => {quantityDispatch({type:'increment', payload:data1._id});}}><span className='text-black'>+</span></button>
                            </div>
                      </div>
                      <div className='removebtn'>
                        <FontAwesomeIcon icon={faXmark} style={{color:'grey'}}></FontAwesomeIcon>
                        <button className=''  onClick={()=>deleteProduct(data1._id)}><span>Remove</span></button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
               
              
              
            
             
           </div>
          
         
         
          <div className=''>
            <TotalPrice/>
          </div>
      </div>
    }
  </>
  )
}

export default AddToCard

