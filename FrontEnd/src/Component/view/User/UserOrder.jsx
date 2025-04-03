import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

function UserOrder()
{
  const [findOrder, setFindOrder] = useState();
  const navigator = useNavigate()

// METHOD FOR ORDER LIST
useEffect(()=>
    {
        axios.get('https://mern-fullstack-1-j3k1.onrender.com/findOrder',{withCredentials:true}).then((res)=>setFindOrder(res.data.data)).catch((error)=>console.log(error))
},[])


  //METHOD FOR CANCEL ORDER
const cancelProduct=((id,product_Id)=>
{

  Swal.fire({
    title: 'Are you sure?',
    text: 'Cancel Product',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, cancel it!',
  }).then((result) => {
    console.log(result)
    if(result.isConfirmed===true) 
    {
      axios.post(`https://mern-fullstack-1-j3k1.onrender.com/cancelOrder/${id}`,product_Id,{withCredentials:true}).then((res)=>
            {
              
              if(res.data.message==='order cancel successfully')
                   {
                    Swal.fire('Cancel!', 'Product Cancel successfully', 'success');
                    navigator(0)
                   }
                   else
                   {
                    Swal.fire('Error', 'Failed to cancel product', 'error');
                   }
            }).catch((error)=>console.log(error))
          }
     
    }
    
  )
})

      
      

  return(
  <>
    <div className='container-fluid w-75  my-5 table-container'>

<h1 className='text-center text-blue m-auto' style={{backgroundColor:"688bf9"}}>Order Products</h1>
  <table className='table m-4 text-center bg-white'>
    <thead className="">
      <tr className='text-center'>
            {/* <th>No.</th> */}
            <th>Product</th>
            <th>Quantity</th>
            <th>Per Product Price</th>
            <th>Total Price</th>
            <th>Image</th>
            <th>Address</th>
            <th>payment</th>
            <th>Action</th>
      </tr>
   </thead>  
    <tbody>
      {
        findOrder &&   findOrder.map((data1)=>
          data1.productName.map((item)=>
              <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.quantity*item.price}</td>
              <td><img src={item.image.url} width='100px' /></td>
              <td >{data1.address.house_no},{data1.address.area},<br></br>{data1.address.state},<br></br>{data1.address.pincode}</td>
              <td>{data1.paymentType}</td>
              <td>
                    <Link onClick={()=>{cancelProduct(data1._id,item._id)}}><button className='btn btn-danger' style={{fontSize:'10px'}} >Cancel Product</button></Link>
              </td>
              </tr>
            )
       
          )  
          }
       </tbody>
    </table>
  
    </div>
  </>
    
  )
}

export default UserOrder