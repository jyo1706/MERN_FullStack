import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import "../../../assets/addtocard.css";
import { useQuantity } from "../../Hooks/useQuantity";
import TotalPrice from "./TotalPrice";
import { BtnContext,    PaymentContext } from "../../Hooks/useContext";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


function AddAddress() {

  const location = useLocation()
  const navigate = useNavigate()
  const pramas = useParams()
  const id = pramas.id
 

    
  // ********************************Display Message*************************************
  useEffect(()=>
    {
      btnDispatch({type:'btn',payload:false})
      paymentDispatch({type:'payment',payload:true})
      localStorage.setItem('page','addToCard')
        const message = localStorage.getItem('cartMessage')
        if(message==='Address Add successfully' || message ==='Address Update successfully')
        {
          Swal.fire({
            title: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ok!',
      })
        }
        localStorage.removeItem('cartMessage')
    },[])
  
  // ********************************Add Address Method*************************************
  const submitAddress = useCallback((e) => {
    e.preventDefault(); 
    const data = e.target; 
    const dataValue = new FormData(data); 
    const datafield = Object.fromEntries(dataValue.entries()); // Convert FormData to a plain object
 
    // Send POST request to the server
    axios.post("http://localhost:4000/address", datafield, {
        withCredentials: true, // Send cookies with the request
      }).then((res) =>
      {
         if(res.data.status==='Address Add successfully')
         {
          // navigate(location.pathname, { replace: true });
          navigate(0,{state:{message:res.data.status}})
          localStorage.setItem('cartMessage', 'Address Add successfully');
         }
      }).catch((err) => {
        console.log(err);
      });
  }, [])

  const { quantities} = useQuantity();

 // ********************************Method For Display Address******************************
  useEffect(() => {
    axios.get("http://localhost:4000/findAddress", {
        withCredentials: true,
      }).then((res) => {
        setFindAddress(res.data.data);
      
      }).catch((err) => {
        console.log(err);
      });
  }, [navigate,location.pathname]);
  
  function handleBackground(id) {
    setSelectAddress(id);
    setSelect(false)
  }
    

  

  const [findAddress, setFindAddress] = useState();
  const [selectAddress, setSelectAddress] = useState();
  const {btnDispatch} =useContext(BtnContext) 
  const{paymentDispatch} = useContext(PaymentContext)
  const [addAddress,setAddAddress] = useState(true)
  const [select,setSelect] = useState(true)
  const BuyNow = localStorage.getItem('BuyNow')
  

  return (
    <>
   
      <div className="productDetailContainer container">
        <div className="product">
       {addAddress && findAddress && findAddress.length >= 1 ? (
            <>
           
              <div className="">
                <div className="d-flex justify-content-between align-items-center">
                   <h3>Select Address</h3>
                   <button className="btn pb-0" style={{backgroundColor:'#325b86'}} onClick={()=>setAddAddress(false)}> <h5>Add Address</h5></button>
                </div>
                {findAddress.map((item, index) => {
                  return (
                    <div
                      className="addressContainer p-3 mb-2"
                      key={index}
                      style={{
                        backgroundColor:selectAddress === item._id ? "#e3f1f2" : "" || (select && index===0 ? '#e3f1f2':'')}}
                    >
                      <div className="d-flex justify-content-between ">
                        <div className="form-check form-check-inline ">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="selectAddress"
                            id="inlineRadio1"
                            onChange={() => handleBackground(item._id)}
                            defaultChecked={index==0}
                          />
                          <label className="form-check-label gap-6">
                            <h6>{item.name}</h6>
                          </label>
                        </div>
                          {/* Edit Address */}
                        <div className="">
                             <Link to={`/editAddress/${item._id}`}><button className="btn" style={{backgroundColor:'#325b86'}}><h6 className="m-0">+ Edit</h6></button></Link>
                        </div>
                      </div>
                      <div className="mx-4 my-2" style={{ color: "grey" }}>
                        <h6>
                          <span>
                            {item.address.house_no} {item.address.area},
                            {item.address.state}    {item.address.pincode}
                          </span>
                        </h6>
                        <h6>{item.mobile}</h6>
                      </div>
                      {selectAddress === item._id || (select && index===0) ? (
                        <div
                          className="d-flex align-item-center justify-content-center"
                          style={{ marginTop: "-20px" }}
                        >
                     {BuyNow==='true' &&    <Link to={`/payment/${item._id}`}><button
                            className="form-button text-center"
                            type="submit"
                            onClick={()=>{paymentDispatch({type:'payment',payload:false});}}
                          >
                          
                            Submit
                          </button>
                          </Link>
                     }
                     {BuyNow==='false' &&    <Link to={`/buyNow/${id}`}><button
                            className="form-button text-center"
                            type="submit"
                            onClick={()=>{paymentDispatch({type:'payment',payload:false}),localStorage.setItem('id',item._id)}}
                          >
                          
                            Submit
                          </button>
                          </Link>
                     }
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
           
              </div>
              
            </>
            
          ) : (
            <div className="addressHeading" style={{flexDirection:'column'}}>
              <h1 className="text-center">ADD DELIVERY ADDRESS</h1>
              <form onSubmit={submitAddress} method="post">
                <div className="pt-1 p-5 form-inner-container">
                  {/*Start Name Field */}
                  <div>
                    <input name="name" placeholder="Enter Your Name" />

                    {/* End Name End */}
                    {/* Start Mobile Field */}
                    <div>
                      <input name="mobile" placeholder="Enter Your Mobile" />
                    </div>
                    {/* End Mobile filed  */}
                    {/* Start Email Field */}
                    <div>
                      <input
                        name="house_no"
                        placeholder="House No ./Building name"
                      />
                    </div>
                    {/* End Email filed  */}
                    {/* Start City Field */}
                    <div>
                      <input name="area" placeholder="Road name/Area/Colony" />
                    </div>
                    {/* End City filed  */}

                    {/* Address field start*/}

                    <input
                      type="number"
                      name="pincode"
                      placeholder="Enter Pincode"
                    />
                    {/* Address field end*/}

                    {/* State field start*/}
                    <div>
                      <select name="state">
                        <option>Select State</option>
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                      </select>
                    </div>
                    {/* State field end*/}
                    {/* Button  Start*/}
                    <div className="text-center">
                     
                       <button className="form-button text-center" type='submit'>
                        Submit
                       </button>
                    
                    </div>

                    {/* Button End */}
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className=''>
       
            <TotalPrice quantities={quantities}/>
          </div>
          
      </div>
     
    </>
    
  );
}

export default AddAddress;
