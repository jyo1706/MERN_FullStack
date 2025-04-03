import React, { useContext } from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorContext } from '../../Hooks/useContext';

function EditAddress() {
  const params = useParams()
  const productId = params.id
  const navigate = useNavigate()
  const [findAddress, setFindAddress] = useState();
  
  // console.log(findAddress)
  useEffect(() => { axios
      .get(`http://localhost:4000/editAddress/${productId}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data)
        setFindAddress(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
const  updateAddress = ((e)=>
  {
    e.preventDefault()
    const targetValue = e.target;
    const formObject = new FormData(targetValue)
    const formData = Object.fromEntries(formObject.entries())
    axios.post(`http://localhost:4000/updateAddress/${productId}`,formData,{
      withCredentials:true
    }).then((res)=>
       {
          // console.log(res.data.message)
         navigate(window.history.back())
         localStorage.setItem('cartMessage','Address Update successfully')
       }
    ).catch((error)=>
  {
    console.log(error)
  })

  })

  return (
    <div className='productDetailContainer container'>
        <div className="addressHeading d-flex flex-column">
              <h1 className="text-center">Update DELIVERY ADDRESS</h1>
              <form onSubmit={updateAddress} method="post">
                <div className="pt-1 p-5 form-inner-container">
                  {/*Start Name Field */}
                  <div>
                    <input name="name" placeholder="Enter Your Name" defaultValue={findAddress && findAddress.name} />

                    {/* End Name End */}
                    {/* Start Mobile Field */}
                    <div>
                      <input name="mobile" placeholder="Enter Your Mobile" defaultValue={findAddress && findAddress.mobile}/>
                    </div>
                    {/* End Mobile filed  */}
                    {/* Start Email Field */}
                    <div>
                      <input
                        name="house_no"
                        placeholder="House No ./Building name" defaultValue={findAddress && findAddress.address.house_no}
                      />
                    </div>
                    {/* End Email filed  */}
                    {/* Start City Field */}
                    <div>
                      <input name="area" placeholder="Road name/Area/Colony"  defaultValue={findAddress && findAddress.address.area}/>
                    </div>
                    {/* End City filed  */}

                    {/* Address field start*/}

                    <input
                      type="number"
                      name="pincode"
                      placeholder="Enter Pincode"
                      defaultValue={findAddress && findAddress.address.pincode}
                    />
                    {/* Address field end*/}

                    {/* State field start*/}
                    <div>
                      <select name="state">
                            <option value=''>Select State</option>
                            <option value="Andaman and Nicobar Islands" selected = {findAddress && findAddress.address.state==='Andaman and Nicobar Islands'}>Andaman and Nicobar Islands</option>
                            <option value="Andhra Pradesh" selected = {findAddress && findAddress.address.state==='Andhra Pradesh'}>Andhra Pradesh</option>
                            <option value="Arunachal Pradesh" selected = {findAddress && findAddress.address.state==='Arunachal Pradesh'}>Arunachal Pradesh</option>
                            <option value="Assam" selected = {findAddress && findAddress.address.state==='Assam'}>Assam</option>
                            <option value="Bihar" selected = {findAddress && findAddress.address.state==='Bihar'}>Bihar</option>
                            <option value="Chandigarh" selected = {findAddress && findAddress.address.state==='Chandigarh'}>Chandigarh</option>
                            <option value="Chhattisgarh" selected = {findAddress && findAddress.address.state==='Chhattisgarh'}>Chhattisgarh</option>
                            <option value="Dadra and Nagar Haveli and Daman and Diu" selected = {findAddress && findAddress.address.state==='Dadra and Nagar Haveli and Daman and Diu'}>Dadra and Nagar Haveli and Daman and Diu</option>
                            <option value="Delhi" selected = {findAddress && findAddress.address.state==='Delhi'}>Delhi</option>
                            <option value="Goa" selected = {findAddress && findAddress.address.state==='Goa'}>Goa</option>
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
    </div>
  )
}

export default EditAddress