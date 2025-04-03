import { useState } from "react";
export let totalData = {}
const initialState = 1;
export const QuantityReducer = (quantityState=initialState,action) => {


  if(action.type==='decrement')
  {
    return {...quantityState,[action.payload]: (quantityState[action.payload] || 1) > 1 ? quantityState[action.payload] - 1 :1} 
  }
  if(action.type==='increment')
  { 
    return {...quantityState,[action.payload]: (quantityState[action.payload] || 1) + 1,} 
  }
  if(action.type==='reset')
  {
    return initialState
  }
 
  return quantityState

};
