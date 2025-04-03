import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShareNodes} from '@fortawesome/free-solid-svg-icons';       // Import specific icons from the free solid icon set
import { faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import '../../../../assets/productview.css'
import { ErrorContext } from '../../../Hooks/useContext';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
function ProductView() {
   
    // console.log(data)
    const params = useParams()
    const productId = params.id
    const navigator = useNavigate()
   
    const i = 1;
    useEffect(()=>
    {
        axios.get(`http://localhost:4000/view/${productId}`, {
          withCredentials: true, // This sends cookies with the request
        })
         .then((res)=>{
           
          setData(res.data)
        
          // console.log(res.data)
   
        }
        )
      .catch((err)=>{
        navigator('/login')
            console.log(err)})
    },[])
   

  const addProduct = ()=>{
                
      axios.get(`http://localhost:4000/addTocard/${productId}`, {
        withCredentials: true,                                                 // This sends cookies with the request
      })
       .then((res)=>{
         if(res.data.userData.role==='user')
            {
              setData(res.data)
             
                     
                        Swal.fire({
                          title:res.data.message,
                          icon: 'success',
                     
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'ok!',
                    })
                  navigator(0)
             
              // console.log(res.data)
              // navigator(`/addToCard`,{state:{message:res.data.message}})
            }
         else
         {
          navigator('/login')
         }
       
      }
      )
    .catch((err)=>
      {
        navigator('/login')
        console.log(err)})
  }
   const [data,setData] =  useState({})
    const save = data.data && data.data.price
    const original_price =data.data && data.data.original_price
    const id = data.data && data.data._id


  return (
   <>
 
    <div className='container-fluid productViewContainer mt-5'>
          <div className='productImages'>
             <img src={data.data && data.data.image.url}/>
             <img src={data.data && data.data.image.url}/>
             <img src={data.data && data.data.image.url}/>
             <img src={data.data && data.data.image.url}/>
          </div>
          <div className='productImage'>
            <img src={data.data && data.data.image.url}/>
             <div className='buttons mt-5 w-100'>
                <button className='btn first btnAddToCart' onClick={addProduct}>Add TO Cart</button>
                <Link to={`/buynow/${id}`}><button className='btn second btnAddToCart mx-2'>Buy Now</button></Link>
             </div>
          </div>
          <div className='productDetail'>    
              <h1>{data.data &&  data.data.des}</h1>
              <div className='productPrice'> 
                <span>₹{Math.ceil(save-(save * original_price/100))}</span>
                <span><del>₹{data.data && data.data.price}</del></span>
                <span>{data.data &&   data.data.original_price}% Off</span>
              </div>
              <div className='productRating'>
            <h6 className='starIcon'><span>4.5</span><FontAwesomeIcon icon={faStar}/></h6>
              </div>
              <div className='productDelivery'>{data.data && data.data.deliveryCharge}</div>
              
          </div>
       
        
    </div>
   </>
  )
}

export default ProductView