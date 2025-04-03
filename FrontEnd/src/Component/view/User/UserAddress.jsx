import React from 'react'
import { Link } from 'react-router-dom'

function UserAddress() 
{
    const totalPrice = () => {
        const totalData = data.data;
        
        // Sum up the prices
        const total = totalData?.reduce((acc, item) => {
      
           const itemQuantity = quantities[item._id] || 1;  // Get the quantity for this item
           
          //  console.log(itemQuantity)
    
            return acc + parseInt(item.price) * itemQuantity;
        }, 0); 
       
        return total;
    };
    const totalDiscount = () => {
      const totalData = data.data;
      
      // Sum up the prices
      const total = totalData?.reduce((acc, item) => {
    
         const itemQuantity = quantities[item._id] || 1;  // Get the quantity for this item
         
        //  console.log(itemQuantity)
    
          return acc + parseInt(item.original_price) * itemQuantity;
      }, 0); 
     
      return total;
    };
  return (
    <div className='productDetailContainer container'>
           <div className='product'>
           <h1>Product Detail</h1> 
            
           </div>
          
            <div className='total'>
                 <div className='totalContainer'>
                    <h1>Product Price</h1>
                     <div className='totalPrice'>
                         <h5>Total Price :</h5>
                         <span>+ ₹{totalDiscount()}</span>
                     </div>
                     <div className='totalDiscount'>
                         <h5>Total totalDiscount :</h5>
                         <span className='text-success'>- ₹{totalDiscount()-totalPrice()}</span>
                     </div>
                     <hr/>
                     <div className='order'>
                     <h5>Order Total :</h5>
                     <span> ₹{totalPrice()}</span>
                     </div>
                     <span className='btnHeading'>Clicking on 'Continue' will not deduct any money</span>
                     <Link to='address'><button className='btn d-block my-2 conBtn'>Continue</button></Link>
                 </div>
                 
            </div>
      </div>
  )
}

export default UserAddress