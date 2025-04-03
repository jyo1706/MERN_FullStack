import { useState } from "react";
import { resValidation } from "../../../Hooks/Validation";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({});
  const navigation = useNavigate();
  const [getError, setGetError] = useState("");

  // Handle Form Data
  const sentData = (e) => {
    try {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const formObj = Object.fromEntries(formData.entries());

      // get validation errors
      const isValidation = resValidation(formObj);
      setFormData(isValidation);

      //sent data to the database
      if (Object.keys(isValidation).length === 0) {
        axios
          .post("http://localhost:4000/res", formObj)
          .then((res) => {
            navigation("/login");
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            setGetError(err.response.data.message);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      {/* Registration Div Start */}
      <div className="bg-white res-container pt-1 p-3">
        {/* Form Heading */}

        {/* Form Start */}
        <div className="form-container">
          <h3 className="heading text-center mt-5">Registration</h3>
          {getError !== "" && (
            <h1 className="backendError container">{getError}</h1>
          )}
          <form onSubmit={sentData} method="post">
            <div className="pt-1 p-5 form-inner-container">
              {/*Start Name Field */}
              <div>
                <input name="name" placeholder="Enter Your Name" />
              </div>
              {formData.name && (
                <p className="validation text-danger">
                  <i>{formData.name}</i>
                </p>
              )}
              {/* End Name End */}

              {/* Start Email Field */}
              <div>
                <input name="email" placeholder="Enter Your Email" />
                {formData.email && (
                  <p className="validation text-danger">
                    <i>{formData.email}</i>
                  </p>
                )}
              </div>
              {/* End Email filed  */}
              {/* Start City Field */}
              <div>
                <input name="city" placeholder="Enter Your city" />
                {formData.city && (
                  <p className="validation text-danger">
                    <i>{formData.city}</i>
                  </p>
                )}
              </div>
              {/* End City filed  */}
              {/* Start Mobile Field */}
              <div>
                <input name="mobile" placeholder="Enter Your Mobile" />
                {formData.mobile && (
                  <p className="validation text-danger">
                    <i>{formData.mobile}</i>
                  </p>
                )}
              </div>
              {/* End Email filed  */}
              {/* Password field start*/}
              <div className="password">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                />
                {formData.password && (
                  <p className="validation text-danger">
                    <i>{formData.password}</i>
                  </p>
                )}
              </div>

              {/* Password field end*/}
              {/* ConfirmPassword field start*/}
              <div>
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Enter Confirm password"
                />
                {formData.confirm_password && (
                  <p className="validation text-danger">
                    <i>{formData.confirm_password}</i>
                  </p>
                )}
              </div>
              {/* ConfirmPassword field end*/}
              {/* Button  Start*/}
              <button className="form-button" type="submit">
                Submit
              </button>
              <p className="bottom-heading-registration">Already have an account ? <span className="inner"><Link to='/login'>Login</Link></span></p>
              {/* Button End */}
            </div>
          </form>
        </div>
        {/* Form end */}
      </div>
      {/* Registration Div End */}
    </div>
  );
};
export default Registration;
