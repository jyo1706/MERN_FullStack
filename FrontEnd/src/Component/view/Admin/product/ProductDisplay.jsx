import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import { UserContext } from '../../../Hooks/useContext'
import { toast, ToastContainer } from 'react-toastify'
import ProductHeader from './ProductHeader'






const ProductDisplay = ()=> {
 
const [data,setData] = useState()

const navigator = useNavigate()
let i=1;
const{search} = useContext(UserContext)
// dispatch({type:"user",payload:true})


const location = useLocation();


  function deleteData(id)
  {
   
    // console.log("hello")
    axios.get(`http://localhost:4000/deleteData/${id}`,{withCredentials:true})
     .then(res=>{ if(res.data.message==='Data Delete Successfully'){navigator('/displayData',{state:{message:res.data.message}})}})
     .catch(err=>console.log(err))
     const message = location.state?.message;
     toast.success(message)
  }


    useEffect(()=>{
            
              axios.get(`http://localhost:4000/displayData`,{
                  withCredentials:true, // This sends cookies with the request
                }).then((response)=>{
                    
                    if(response.data.userData.role==="user")
                    {
                      navigator('/login')
                    }
                    if(response.data.userData.role==="admin")
                      {
                        setData(response.data.data);
                      }
                    
                 }).catch((err)=>{
                       console.log(err)
                       if(err.response.data.status===401)
                       {
                        navigator('/login')
                       }
                       
                    })
                    
                  
    },[navigator])
 const filterData = data &&  data.filter((item)=>item.name.includes(search.charAt(0).toUpperCase()+search.slice(1)))
   
    
  return (
    <>
     <ProductHeader/>
    <div className='container-fluid my-5 table-container'>

    <h1 className='text-center text-blue m-auto' style={{backgroundColor:"688bf9"}}>Display Data</h1>
         <Link to={`/product`} className='btn btn-success addbtn'>Add Item</Link>
        <table className='table m-4 text-center bg-white'>
          
            <thead className="">
              
              <tr className='text-center'>
                <th>No.</th>
                <th>Name</th>
                <th>Full Detail</th>
                <th>original_Price</th>
                <th>Discount</th>
                <th>Final_Price</th>
                <th>Quantity</th>
                <th>Delivery_Charge</th>
                <th>Image</th>
                <th>Action</th>
            </tr>
            </thead>  
           <tbody>
              {
                filterData &&   filterData.length=== 0 ? (<span className='text-center' style={{fontSize:"15px" , color:"grey",wordSpacing:"2px",letterSpacing:"-1px"}}>sorry product not available</span>) :(filterData &&   filterData.map((data1)=>
              <tr key={data1.id} className=''>
                  <td>{i++}</td>
                  <td>{data1.name}</td>
                  <td>{data1.des}</td>
                  <td >{data1.price}</td>
                  <td>{data1.original_price}%</td>
                  <td>{Math.ceil(data1.price-(data1.price*data1.original_price/100))}</td>
                
                  <td >{data1.quantity}</td>
                  <td>{data1.deliveryCharge}</td>
              <td>
                <img
                  src={data1.image.url}
                  alt={data1.name}
                 style={{width:"60px",height:"60px"}}
                />
              </td>
            
                  <td className='' >

                    {/* <Link to={`/productView/${data1._id}`} className=' btn btn-success m-2'>View</Link> */}
                    <Link to={`/productEdit/${data1._id}`} className='btn btn-warning m-1'>Edit</Link>
                    <Link to={``}  onClick={()=>deleteData(data1._id)} className='btn btn-danger m-2'>Delete</Link>
                    
                  </td>
                </tr>
               
                ))  
              }
           </tbody>
        </table>
        <ToastContainer position='top-center'/>
    </div>
    </>
  )
}

export default ProductDisplay