import { Route, Routes} from 'react-router-dom'
import './App.css'
import './assets/home.scss'
import 'react-toastify/dist/ReactToastify.css'; 
import { BtnContext, CartLength, ErrorContext, PaymentContext, PaymentMethod, QuantityContext, UserContext } from './Component/Hooks/useContext'
import React, { lazy,useEffect, useReducer,useState,Suspense } from 'react'
import { BtnReducer,  cartReducer, errorReducer, loginReducer, paymentMethodReducer, paymentReducer, } from './Component/Reducer/reducer'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Login          =lazy(()=>import('./Component/view/Admin/resgistration/Login'))
const Registration   =lazy(()=>import('./Component/view/Admin/resgistration/Registration'))
const UserDashboard  =lazy(()=>import('./Component/view/Admin/product/Product'))
const ProductDisplay =lazy(()=>import('./Component/view/Admin/product/ProductDisplay'))
const ProductView    =lazy(()=>import('./Component/view/Admin/product/ProductView'))
const ProductEdit    =lazy(()=>import('./Component/view/Admin/product/ProductEdit'))
const Header         =lazy(()=>import('./Component/view/Admin/Header'))
const ForgetPassword =lazy(()=>import('./Component/view/Admin/resgistration/ForgetPassword'))
const ResetPassword  =lazy(()=>import('./Component/view/Admin/resgistration/ResetPassword'))
const AddToCard      =lazy(()=>import('./Component/view/User/AddToCard'))
const UserAddress    =lazy(()=>import('./Component/view/User/UserAddress'))
const AddAddress     =lazy(()=>import('./Component/view/User/AddAddress'))
const Payment        =lazy(()=>import('./Component/view/User/Payment'))
const QuantityReducer = lazy(()=>import('./Component/Reducer/quantityReducer'))
const EditAddress = lazy(()=>import('./Component/view/User/EditAddress')) 
const UserOrder = lazy(()=>import('./Component/view/User/UserOrder'))

const BuyNow = lazy(()=>import('./Component/view/User/BuyNow'))
// const LazyComponent = React.lazy(() => import('./LazyComponent'));
const Home = lazy(()=>import( './Component/view/Home'))

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
     <Suspense fallback={<div className='loader'></div>}>
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
          </Suspense>
  </>
  )
}

export default App
