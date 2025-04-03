import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartLength, UserContext } from "../../Hooks/useContext.js";
import '../../../assets/header.css'
import {faBars,faUserTie,faHouse, faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { useEffect } from "react";

function Header({data}) {
  const navigation = useNavigate();
  const { loginState, loginDispatch, setSearch } = useContext(UserContext);
  const userName = localStorage.getItem("username");
  const role = localStorage.getItem('role')
  const location = useLocation()
 
//Toggle Login And Logout
  useEffect(()=>
{
  if(userName) {
    loginDispatch({ type: "user", payload: true });
  } else {
    loginDispatch({ type: "user", payload: false });
  }
},[userName])
 
// ******************* Logout Method *************************
  function logout() {
   axios.get("http://localhost:4000/logout", { withCredentials: true }).then((response) => {
        if (response.data.message === "logout") {
          navigation("/");
          localStorage.removeItem("username");
          localStorage.removeItem("role");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {/* Header Div Start */}

      <div className="header container-fluid ">
      
        <div className="header-inner">
         <div className="">
         <div className="logo">
            <h3>Shopping</h3>
          </div>
         </div>
             
            <div className="">
            {/********************** Search  ***********************/}
            {location.pathname==='/' && <div className="search">
            {/* Searchbar..... */}

            <input
              type="text"
              className="form-control searchBar"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              style={{ marginBottom: "0px" }}
            />
            {/* <i className="fas fa-search"></i> */}
             </div>}
             
          <ul className="header-ul" id="navbarSupportedContent" style={{ marginBottom: "0" }}>
            <Link to="/">
              <li><span ><FontAwesomeIcon className = 'icon' icon={faHouse}  /></span>Home</li>
             </Link>
             {role==='admin' && <Link to="/displayData">
              <li><span ><FontAwesomeIcon className = 'icon' icon={faHouse}  /></span>Display</li>
             </Link>}
            <li className="nav-item dropdown">
                   <Link className="nav-link" href="#"  data-bs-toggle="dropdown"><span><FontAwesomeIcon className = 'icon' icon={faUserTie} /></span>Profile</Link>
                   <ul className="dropdown-menu px-3">
                 
                        <Link to="/">{loginState && <li className="text-black">{userName}</li>}</Link>
                        {role==='user' && <Link to='/orders'>{loginState && <li className="text-black">MyOrders</li>}  </Link>}
                      
                          {loginState ? (
                             <Link className="text-white" type="submit" onClick={logout}>
                                  <li className="lastLi text-black">Logout</li>
                             </Link>
                            ) : (
                              <Link to="/login " className="text-white" type="submit">
                                <li className="lastLi text-black">Login</li>
                              </Link>
                            )}
                    </ul>
             </li>
             {role==='user' && <Link to='/addToCard'><li><span >{data>=1 && <sup className="cartSub"><span>{data}</span></sup>}<FontAwesomeIcon className = 'icon supIcon' icon={faCartShopping} /></span><span>Cart</span></li></Link>}
        
          </ul>
          {/* ******************************Mobile******************************* */}
        
                    
                    
                    <div className="offcanvas offcanvas-end" id="demo">
                      
                      <div className="offcanvas-body" >
                         <ul   style={{ marginBottom: "0" }}>
                               <Link to="/" type="button" >
                                 <li className="text-reset mt-2" data-bs-dismiss="offcanvas"><h6>Home</h6></li>
                               </Link>
                               <Link to="/orders">{loginState && <li className="text-reset mt-2" data-bs-dismiss="offcanvas">myOrder</li>}</Link>
                               {role==='user' && <Link to='/addToCard'><li className="text-reset mt-2" data-bs-dismiss="offcanvas"><span >{data>=1 && <sup className="cartSub"><span>{data}</span></sup>}</span><span>Cart</span></li></Link>}
                               <Link to="">{loginState && <li>{userName}</li>}</Link>
                               
                               {loginState ? (
                                 <Link  type="submit" onClick={logout} className="w-100">
                                   <li className="text-black text-reset mt-2" data-bs-dismiss="offcanvas"><h6>Logout</h6></li>
                                 </Link>
                                 
                               ) : (
                                 <Link to="/login"  type="submit">
                                   <li className="text-reset mt-2" data-bs-dismiss="offcanvas" ><h6>Login</h6></li>
                                 </Link>
                               )}
                         </ul>
                      </div>
                    </div>
                    <button className="btn  headerBtn d"  type="button" data-bs-toggle="offcanvas" data-bs-target="#demo">
                          <FontAwesomeIcon className = 'icon' icon={faBars} style={{fontSize:'25px'}}/>
                    </button>
             
          </div>
        </div>
   
      </div>

      {/* Header Div End */}
    </>


  );
}

export default Header;
