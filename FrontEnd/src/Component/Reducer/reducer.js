

export const loginReducer = (loginState,action)=>{
   // console.log(state,action)
       if(action.type ==='user')
         {
            return action.payload
         }
         // console.log(state)
      return loginState
}

export const BtnReducer = (btnState,action)=>
{
   if(action.type==='btn')
   {
      return action.payload
   }
   return btnState
}

export const paymentReducer = (paymentState,action)=>
{
   if(action.type==='payment')
   {
      return action.payload
   }
   return paymentState
}
export const paymentMethodReducer = (paymentMethodState,action)=>
{
   if(action.type==='payment')
   {
      return action.payload
   }
   return paymentMethodState
}
export const errorReducer = (errorState,action)=>
   {
      if(action.type==='error')
      {
         return action.payload
      }
      return errorState
   } 
export const cartReducer = (cartState,action)=>
      {
         if(action.type==='cart')
         {
            return action.payload
         }
         return cartState
      } 
