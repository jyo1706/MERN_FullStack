import{r as s,g as T,u as I,a as r,j as e,F as M,o as z,S as l}from"./vendor-D_SluWwt.js";import{T as E}from"./TotalPrice-spOR_qht.js";import{P as F,B as A,a as g,Q as R}from"./index-BosGv7D6.js";/* empty css               *//* empty css                  */function K(){const[$,h]=s.useState(!1),{paymentDispatch:v}=s.useContext(F),{btnDispatch:C,btnState:Q}=s.useContext(A),{paymentMethodDispatch:p}=s.useContext(g),{quantityState:o,quantityDispatch:u}=s.useContext(R),{paymentMethodState:i}=s.useContext(g),N=T(),d=I(),b=N.id;s.useState(!1),s.useState(!1),s.useEffect(()=>{v({type:"payment",payload:!1}),C({type:"btn",payload:!1})},[]),s.useEffect(()=>{r.get(`https://mern-fullstack-1-j3k1.onrender.com/buyNow/${b}`,{withCredentials:!0}).then(t=>{P(t.data.data)}).catch(t=>{d("/login"),console.log(t)})},[]),s.useEffect(()=>{r.get("https://mern-fullstack-1-j3k1.onrender.com/findAddress",{withCredentials:!0}).then(t=>{S(t.data.data[0])}).catch(t=>console.log(t))},[]);const[a,P]=s.useState([]),m=localStorage.getItem("page"),[x,S]=s.useState(),O=Object.values(o),c=a&&a.price,B=a&&a._id,y={paymentMethodState:i,id:B,quantity:O},j=a&&a.original_price,k=Math.ceil(c*Object.values(o).map(t=>t===0?1:t).reduce((t,n)=>t*n,1)*j/100),_=c*Object.values(o).map(t=>t===0?1:t).reduce((t,n)=>t*n,1)-Math.ceil(c*Object.values(o).map(t=>t===0?1:t).reduce((t,n)=>t*n,1)*j/100),w=()=>{if(i!=null)if(i==="Online Payment"){const t={key:"rzp_test_zFG2soycp0tt1P",amount:_*100,currency:"INR",handler:function(D){l.fire({title:"Order place and Payment Done ,successfully",icon:"success",confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"ok!"}),r.post(`https://mern-fullstack-1-j3k1.onrender.com/placeOrder/${x._id}`,y,{withCredentials:!0}).then(f=>{d("/"),localStorage.removeItem("page"),u({type:"reset"})}).catch(f=>console.log(f.message))}},n=window.Razorpay(t);n.open(),n.on("payment fail",function(D){l.fire({title:"Payment Failed",icon:"success",confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"ok!"})})}else r.post(`https://mern-fullstack-1-j3k1.onrender.com/placeOrder/${x._id}`,y,{withCredentials:!0}).then(t=>{d("/"),localStorage.setItem("order","Order Place Successfully");const n=localStorage.getItem("order");l.fire({title:n,icon:"success",confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"ok!"}),localStorage.removeItem("order"),localStorage.removeItem("page"),u({type:"reset"})}).catch(t=>console.log(t.message));else l.fire({title:"Plz Select Payment Method",icon:"warning",confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"ok!"})};return e.jsxs(e.Fragment,{children:[m==="buynow"&&e.jsxs("div",{className:"review",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h6",{children:e.jsx(M,{className:"icon",icon:z,style:{color:"#325b86",fontSize:"14px",fontWeight:"700"}})}),e.jsx("label",{children:"Review"})]}),e.jsx("div",{style:{color:"#325b86",fontSize:"10px",marginTop:"-10px"},children:"_____________________________________________"}),e.jsx("div",{className:"text-center",children:e.jsxs("div",{className:"",children:[e.jsx("h6",{style:{color:"#325b86",borderColor:" #325b86"},children:"2"}),e.jsx("label",{children:"Payment"})]})})]}),e.jsxs("div",{className:"productDetailContainer container",children:[e.jsx("div",{className:"product",children:e.jsxs("div",{className:"",children:[e.jsx("h1",{children:"Select Payment Method"}),e.jsxs("div",{className:"paymentContainer mt-3",children:[e.jsx("div",{className:"payment",children:e.jsxs("div",{className:"cashOnDelivery",children:[e.jsx("h1",{children:"Cash On Delivery"}),e.jsx("img",{src:"	https://static-assets.meesho.com/videos/cod_icon_v2.gif"})]})}),e.jsx("input",{type:"radio",name:"payment",onChange:()=>{h(),p({type:"payment",payload:"Cash On Delivery"})}})]}),e.jsx("div",{className:"payOnline mt-3",children:e.jsxs("div",{className:"paymentContainer",style:{border:"none"},children:[e.jsx("div",{className:"payment",children:e.jsx("div",{className:"cashOnDelivery",children:e.jsx("h1",{children:"Pay Online"})})}),e.jsx("input",{type:"radio",name:"payment",className:"inputTag",onChange:()=>{h(!0),p({type:"payment",payload:"Online Payment"})}})]})})]})}),e.jsxs("div",{className:"",children:[m==="addToCard"&&e.jsx(E,{}),m==="buynow"&&e.jsx("div",{className:"",children:e.jsx("div",{className:"total",children:e.jsxs("div",{className:"totalContainer",children:[e.jsx("h4",{children:"Product Detail"}),e.jsxs("div",{className:"totalPrice",children:[e.jsx("h5",{style:{borderBottom:"2px dotted grey"},children:"Total Product Price:"}),e.jsxs("span",{children:["+ ₹",c*Object.values(o).map(t=>t===0?1:t).reduce((t,n)=>t*n,1)]})]}),e.jsxs("div",{className:"totalPrice mb-0",style:{color:"green"},children:[e.jsx("h5",{style:{color:"green",borderBottom:"2px dotted green"},children:"Total Discount"}),e.jsxs("span",{children:["-₹",k]})]}),e.jsx("hr",{}),e.jsxs("div",{className:"order",children:[e.jsx("h5",{children:"Order Total:"}),e.jsxs("span",{children:["₹",_]})]}),e.jsxs("div",{children:[e.jsx("h6",{className:"text-center text-success",children:"You Save :"}),e.jsx("span",{className:"btnHeading",children:"Clicking on 'Continue' will not deduct any money"}),e.jsxs("form",{action:w,method:"post",children:[" ",e.jsx("button",{className:"form-button d-block my-2 conBtn",onClick:()=>localStorage.getItem("BuyNow"),children:"Continue"})]})]})]})})})]})]})]})}export{K as default};
