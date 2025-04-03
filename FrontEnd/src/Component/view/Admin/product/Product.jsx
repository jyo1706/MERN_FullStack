import axios from "axios"

import { useNavigate } from "react-router-dom"
import Userdata from "../../../Hooks/Userdata"


function Product() {
const navigator = useNavigate()


    Userdata()  // authorization function 


  const submitData = ((e)=>{

     e.preventDefault()
     const formData = e.target
     const form = new FormData(formData)
     const data =  Object.fromEntries(form.entries())
     console.log(data.image)
     axios.post('https://mern-fullstack-1-j3k1.onrender.com/productData',data, {
      withCredentials: true,  // This sends cookies with the request
      headers: {
          "Content-Type": "multipart/form-data",
        },
    }).then((response)=>{response.data.userData; if(response.data.message==='Data add successfully') {navigator('/displayData', { state: { message: response.data.message } })}}).catch((err)=>{ navigator('/');console.log(err)})
     
  })
  return (
   <>
  
    <div className="main">
      {/* Registration Div Start */}
      <div className="bg-white res-container pt-1 p-3">
        {/* Form Heading */}

        {/* Form Start */}
        <div className="form-container">
          <h3 className="heading text-center mt-5">Product</h3>
          {/* {getError !== "" && (
            <h1 className="backendError container">{getError}</h1>
          )} */}
          <form onSubmit={submitData} method="post" encType="multipart/form-data">
            <div className="pt-1 p-5 form-inner-container">
              {/*Start Name Field */}
              <div>
                <input name="name" placeholder="Enter Product Name" required />
              </div>
             
              {/* End Name End */}
              {/*Start Product Detail Field */}
              <div>
                <input name="des" placeholder="Enter Product Full Detail" required />
              </div>
             
              {/* End Product Detail End */}

              {/* Start price Field */}
              <div>
                <input name="price" placeholder="Enter product Price" required />
                
              </div>
              {/* End price filed  */}

               {/* Start Original price Field */}
               <div>
                <input name="original_price" placeholder="Enter Discount in %" required />
                
              </div>
              {/* End price filed  */}
              {/* Start quantity Field */}
              <div>
                <input name="quantity" placeholder="Plz Enter Quantity" required/>
                
              </div>
              <div>
                <input name="deliveryCharge" placeholder="Plz Delivery Charge" defaultValue='Free Delivery'/>
                
              </div>
              {/* End quantity filed  */}
              <div>
                <input type='file' name="image" placeholder="" multiple required/>
                
              </div>
              
             
             
              {/* Button  Start*/}
              <button className="form-button" type="submit">
                Submit
              </button>
             
              {/* Button End */}
            </div>
          </form>
        </div>
        {/* Form end */}
      </div>
      {/* Registration Div End */}
    </div>
   </>
  );
}

export default Product