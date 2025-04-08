import React from 'react'
import '../../../../assets/homeShimmer.css'
function HomeShimmer() {

    const mapped = Array.from({length:10}).map((val,i)=>
        {
            return <div key={i} className='homeCard shimmerCard'>
                    <div className='text-center h-75'> </div>
                    <div className='mb-1 cardDetail'><span><h6 className='cardHeading'></h6></span>
                    <div className='cardHeading ShimmerHeading'></div>
                    <div className='cardPrice ShimmerPrice'>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className='review ShimmerReview'></div>
                 </div>
            </div>
      })
     
  return (
    <div>
        <div className='container'>
            <div className='homeCardContainer'>
                 {mapped}
            </div>
        </div>
    </div>
  )
}

export default HomeShimmer
