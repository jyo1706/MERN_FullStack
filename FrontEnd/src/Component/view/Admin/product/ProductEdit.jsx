import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../Hooks/useContext";


function ProductEdit() {
  const [data, setData] = useState({});
  // console.log(data);
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();
 
  
  // Fetch product data on component mount (if editing an existing product)
  useEffect(() => {
    axios
      .get(`https://mern-fullstack-1-j3k1.onrender.com/edit/${productId}`, {
        withCredentials: true, // This sends cookies with the request
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // Populate the form with the existing product data
        setData(res.data.data);
      })
      .catch((err) =>{navigate('/login'); console.log(err)});
  }, [productId]); // Only run on mount (and if productId changes)

  // Edit form submission handler
  const editData = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(params.id); // Debugging: check if productId is correctly fetched
    try {
      const form = e.target; // Get the form element
      const formData = new FormData(form); // Collect form data
      const editData = Object.fromEntries(formData.entries()); // Convert FormData to a regular object

      // Make PUT request to the backend API to update the product
      axios
        .put(`https://mern-fullstack-1-j3k1.onrender.com/update/${productId}`, editData, {
          withCredentials: true, // This sends cookies with the request
          headers: {
          "Content-Type": "multipart/form-data",
        },
        })
        .then((response) => {
          // On successful update, navigate to the display page
          if (response.data.message === "Data saved") {
            navigate("/displayData");
            
          }
        })
        .catch((err) =>{  console.log(err)}); // Handle errors
    } catch (error) {
      console.log(error); // Log any errors that occur
    }
  };

  return (
    <>
  
      <div className="main">
        {/* Edit Div Start */}
        <div className="bg-white res-container pt-1 p-3">
          {/* Form Heading */}

          {/* Form Start */}
          <div className="form-container">
            <h3 className="heading text-center mt-5">Product</h3>

            <form onSubmit={editData} method="post" encType="multipart/form-data">
              <div className="pt-1 p-5 form-inner-container">
                {/*Start Name Field */}
                <div>
                  <input
                    name="name"
                    placeholder="Enter Product Name"
                    defaultValue={data.name}
                    required
                  />
                </div>

                {/* End Name End */}
                {/*Start Product Detail Field */}
              <div>
                <input name="des" placeholder="Enter Product Full Detail" defaultValue={data.des} required />
              </div>
             
              {/* End Product Detail End */}

                <div>
                  <input
                    name="original_price"
                    placeholder="Enter discount in %"
                    defaultValue={data.original_price}
                    required
                  />
                </div>

                {/* Start price Field */}
                <div>
                  <input
                    name="price"
                    placeholder="Enter product Price"
                    defaultValue={data.price}
                    required
                  />
                </div>
                {/* End price filed  */}

                {/* Start quantity Field */}
                <div>
                  <input
                    name="quantity"
                    placeholder="Plz Enter Quantity"
                    defaultValue={data.quantity}
                    required
                  />
                </div>
                <div>
                    <input name="deliveryCharge" placeholder="Plz Delivery Charge" defaultValue={data.deliveryCharge}/>
                </div>
                {/* End quantity filed  */}
                <div>
                  <input
                    name="image"
                    type="file"
                    placeholder="Plz Enter Quantity"
                   
                  />
                 
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
        {/* Edit Div End */}
      </div>
    </>
  );
}

export default ProductEdit;
