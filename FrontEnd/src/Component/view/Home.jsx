import  { useContext, useEffect, useState } from 'react'
import '../../assets/home.css'
import axios from 'axios';
import { Link} from 'react-router-dom';
import Loader from 'rsuite/Loader';
import 'rsuite/Loader/styles/index.css';
import { UserContext } from '../Hooks/useContext';
import ProductHeader from './Admin/product/ProductHeader';
import HomeShimmer from './ShimmerEffect/HomeShimmer'

function Home() {
  const [data,setData] = useState([])
  const {search} = useContext(UserContext)
  const [time,setTime] = useState(new Date())
 

  

  useEffect(()=>{
    axios.get(`https://mern-fullstack-1-j3k1.onrender.com/home`,{
        withCredentials:true, // This sends cookies with the request
      }).then((response)=>{
          setData(response.data.data);
 
       }).catch((err)=>{
             console.log(err)
             if(err.response.data.status===401)
             {
              navigator('/login')
             }
             
          })
},[])

const filterData = data.filter((item) =>
    item.name.includes(search.charAt(0).toUpperCase()+search.slice(1))
 
)



  return (
    <>
    <ProductHeader/>
    {
      filterData != '' ? 
    
     <div className='container'>
     <div className="homeCardContainer">
     {
     filterData.length===0  ? ( <div className="product-not-found">
        <span style={{fontSize:"15px" , color:"grey",wordSpacing:"2px",letterSpacing:"-1px"}}>sorry product not available</span>
            </div>) :(filterData.map((data1,inx)=>
            
             <Link to={`/productView/${data1._id}`} key={inx}>
              <div className='homeCard'>
                      <div className='text-center'>
                           <img src={data1.image.url} alt={data1.name} lading='lazy'/>
                      </div>
                      
                      <div className='mb-1 cardDetail'>
                        <span><h6 className='cardHeading text-center'>{data1.name}</h6></span>
                        <div className='cardPrice'> 
                              <span>₹{Math.ceil(data1.price-(data1.price*data1.original_price/100))}</span>
                              <span><del>₹{data1.price}</del></span>
                              <span>{data1.original_price}% Off</span>
                        </div>

                              <div>{data1.deliveryCharge}</div>
                         <div className='review' style={{color:"green",marginRight:"10px"}}>
                        
                         {/* <FontAwesomeIcon className = 'icon' icon={faShareNodes} style={{color:"green",marginRight:"10px"}}/>     
                         <FontAwesomeIcon className = 'icon' icon={faWhatsapp} style={{color:"green"}}/> */}
                         </div>
                      </div>
                     
             </div>
             </Link>
             ) 
              
              
              ) 
        
            
     }
           
          
     </div>
     </div>
     : 
     <HomeShimmer/>
    }
    </>
  )
}

export default Home