import React from 'react'
import { Link } from 'react-router-dom'

function HomeShimmer() {
  return (

<div className='container'>
     <div className="homeCardContainer">
    <div className="product-not-found">
        <Link>
            <div className='homeCard'>
                <div className='text-center'>
                         
                </div>
                <div className='mb-1 cardDetail'>
                    <span><h6 className='cardHeading'></h6></span>
                        <div className='cardPrice'> 
                              <span></span>
                              <span></span>
                              <span></span>
                        </div>

                        <div></div>
                         <div className='review' style={{color:"green",marginRight:"10px"}}>
                         </div>
                      </div>
                     
             </div>
             </Link>
        
              
              
       
        
            

           
          
     </div>
     </div>
</div>
  )
}

export default HomeShimmer