import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../animations/erorr.json'

function ErorrElment() {

  return (
    <div className='erorr'>
<Lottie
animationData={animationData}
style={{ width: "40%", height: "40%", marginLeft: 10 }}
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