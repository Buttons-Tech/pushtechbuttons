import Image from 'next/image'
import React from 'react'

const ButtnsStrip = () => {
  return (
    <>
      <div className='flex gap-5 px-5 items-center justify-between'>
        <div >
<Image 
src="/food/chicken_chips.jpg"
width={50}
height={50}
className='rounded-full'
alt='food'
/>
<label htmlFor="image">Food</label>
        </div>

<div className=''>
<Image 
src="/wash/shirt.jpg"
width={50}
height={50}
className='rounded-full'
alt='food'
/>
<label htmlFor="image">Wash</label>
</div>

<div>
<Image 
src="/hair/braids.jpg"
width={50}
height={50}
className='rounded-full'
alt='food'
/>
<label htmlFor="image">Style</label>
</div>


<div>
<Image 
src="/refill/gas2.png"
width={50}
height={50}
className='rounded-full'
alt='food'
/>
<label htmlFor="image">Refil</label>
</div>

      </div>
    </>
  )
}

export default ButtnsStrip
