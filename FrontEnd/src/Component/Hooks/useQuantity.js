import { useContext, useState } from "react";
import { QuantityContext } from "./useContext";
export let totalData = {}

export const useQuantity = () => {
  const [quantities, setQuantities] = useState({});
  const{quantityState} = useContext(QuantityContext)


 
  
  
  // Calculate total discount
  const totalDiscount = (data) => {
    const totalData = data
    const total = totalData?.reduce((acc, item) => {
    const itemQuantity = quantityState[item._id] ||1; 
  // Get the quantity for this item
      return acc + parseInt(Math.ceil(item.price-(item.price*item.original_price/100))) * itemQuantity;
    
    }, 0);

    return total;
  };

  // Calculate total price
  const totalPrice = (data) => {
      const totalData = data
      const total = totalData?.reduce((acc, item) => {
      const itemQuantity = quantityState[item._id] || 1// Get the quantity for this item
      
      return acc + parseInt(item.price) * itemQuantity;
    }, 0);

    return total;
  };
 
  return {
    totalDiscount,
    totalPrice,
  };
};
