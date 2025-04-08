import { Route, Routes} from 'react-router-dom'
import './App.css'
import './assets/home.scss'
import 'react-toastify/dist/ReactToastify.css'; 
import Login from './Component/view/Admin/resgistration/Login'
import Registration from './Component/view/Admin/resgistration/Registration'
import UserDashboard from './Component/view/Admin/product/Product'
import ProductDisplay from './Component/view/Admin/product/ProductDisplay'
import ProductView from './Component/view/Admin/product/ProductView'
import ProductEdit from './Component/view/Admin/product/ProductEdit'
import Header from './Component/view/Admin/Header'
import { BtnContext, CartLength, ErrorContext, PaymentContext, PaymentMethod, QuantityContext, UserContext } from './Component/Hooks/useContext'
import React, { useEffect, useReducer } from 'react'
import { BtnReducer,  cartReducer, errorReducer, loginReducer, paymentMethodReducer, paymentReducer, } from './Component/Reducer/reducer'
import ForgetPassword from './Component/view/Admin/resgistration/ForgetPassword'
import ResetPassword from './Component/view/Admin/resgistration/ResetPassword'
const Home = lazy(()=>import( './Component/view/Home'))
import AddToCard from './Component/view/User/AddToCard';
import { useState,lazy,Suspense } from 'react';
import UserAddress from './Component/view/User/UserAddress';
import AddAddress from './Component/view/User/AddAddress';
import Payment from './Component/view/User/Payment';
import { QuantityReducer } from './Component/Reducer/quantityReducer';
import EditAddress from './Component/view/User/EditAddress';
import UserOrder from './Component/view/User/UserOrder'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import BuyNow from './Component/view/User/BuyNow';
// const LazyComponent = React.lazy(() => import('./LazyComponent'));


function App() {
  const [loginState,loginDispatch]  = useReducer(loginReducer,{initialState:false})
  const [btnState,btnDispatch] = useReducer(BtnReducer,{initialState:true})
  const[paymentState,paymentDispatch] = useReducer(paymentReducer,{initialState:true})
  const[quantityState,quantityDispatch ]= useReducer(QuantityReducer,1)
  const[paymentMethodState,paymentMethodDispatch] = useReducer(paymentMethodReducer)
  const[data,setData] = useState()
  const [cartState,cartDispatch] = useReducer(cartReducer)
  const [search,setSearch] = useState('')
  
useEffect(()=>{
    axios.get(`https://mern-fullstack-1-j3k1.onrender.com/addTocard`, {
    withCredentials: true, // This sends cookies with the request
  }).then((res)=>
    {
      setData(res.data.data.length)
    }
  )
},[cartState])


return (
    <>
    <UserContext.Provider value = {{loginState,loginDispatch,search,setSearch}}>
    <BtnContext.Provider value = {{btnState,btnDispatch}}>
    <PaymentContext.Provider value = {{paymentState,paymentDispatch}}>
    <QuantityContext.Provider value = {{quantityState,quantityDispatch}}>
    <PaymentMethod.Provider value={{paymentMethodState,paymentMethodDispatch}}>
    <CartLength.Provider value ={{cartState,cartDispatch}}>
 
    <Header data={data}/>
    
      <Routes>
      
         
          <Route path="/" element={<Home/>}/>
        
          <Route path='/login' element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/product" element={<UserDashboard/>}/>
          <Route path="/displayData" element={<ProductDisplay/>}/>
          <Route path='/productView/:id' element={<ProductView/>}/>
          <Route path='/productEdit/:id' element={<ProductEdit/>}/>
          <Route path='/forgetpass' element={<ForgetPassword/>}/>
          <Route path='/resetPassword/:id' element={<ResetPassword/>}/>

          {/* user components */}
          

          <Route path='/addToCard' element={<AddToCard/>}/>
          <Route path='/address' element={<UserAddress/>}/>
          <Route path='/addAddress/:id' element={<AddAddress/>}/>
          <Route path='/payment/:id' element={<Payment/>}/>
          <Route path='/editAddress/:id' element={<EditAddress/>}/>
          <Route path='/orders' element={<UserOrder/>}/>
          <Route path='/buynow/:id' element={<BuyNow/>}/>
          
         


          </Routes>
       
          </CartLength.Provider>
          </PaymentMethod.Provider>
          </QuantityContext.Provider>
          </PaymentContext.Provider>
          </BtnContext.Provider>
          </UserContext.Provider>
        
  </>
  )
}

export default App
