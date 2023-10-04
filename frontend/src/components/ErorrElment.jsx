import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../animations/erorr.json'

function ErorrElment() {

  return (
    <div className='erorr'>
<Lottie
animationData={animationData}
className='erorr-animation'
                  loop={true}
                  autoPlay={true}
>

</Lottie>
<h1 className='white-color erorrMeasage'>
Atlas chat is facing a proplem right now 😢

</h1>

    </div>
  )
}

export default ErorrElment