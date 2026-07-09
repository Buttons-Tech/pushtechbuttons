import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='w-auto'>
      <span>Store Registration</span>
      {/* <Image 
src="/images/signup.avif"
width={500}
height={300}
alt='signup'
      /> */}
      <div className='w-full m-auto h-full bg-amber-300 '>
        <div className=''>
<label htmlFor="">Store Name:</label> <br />
<input type="text" className='bg-gray-200' />
        </div>
        <div className=''>
<label htmlFor="">Store owner :</label> <br />
<input type="text" className='bg-gray-200' />
        </div>
        <div className=''>
<label htmlFor="">Whatsapp:</label> <br />
<input type="text" className='bg-gray-200' />
        </div>
        <div className=''>
<label htmlFor="">Socials</label> <br />
<input type="text" className='bg-gray-200' />
        </div>
        <div className=''>
<label htmlFor="">Location</label> <br />
<input type="text" className='bg-gray-200' />
        </div>
        <div className=''>
<label htmlFor="">Email</label> <br />
<input type="text" className='bg-gray-200' />
        </div>
        <div className=''>
<label htmlFor="">Payment</label> <br />
<input type="text" className='bg-gray-200' />
        </div>
        <div className=''>
<label htmlFor="">Images</label> <br />
<input type="text" className='bg-gray-200' />
        </div>


      </div>
    </div>
  )
}

export default page
