'use client'
import Image from 'next/image'
import React from 'react'

const page = () => {
    const  message = "Welcome to buttons"
    function magic() {
        alert(message)
    }
    
  return (
    <div>
      {/* Nav bar */}
      <div>
        <span>CHIGoZIE</span>
        <span>App man</span>
      </div>
      {/* banner */}
      <div>
        <Image src="/images/head.jpg"
        width={200}
        height={200}
        alt='headie'
        />

      </div>
      {/* details */}
      <div className='font-bold  '>
        <span className='text-red-800'>Name:</span>
        <span>Chigozie ohakwe</span><br />
        <span className='text-red-800'>Age:</span>
        <span>30</span><br />
        <span className='text-red-800'>Job:</span>
        <span>Software Engineer</span><br />
        <span className='text-red-800'>Salary:</span>
        <span>N5Millon</span>
      </div>
      {/* contact */}
      <div className='w-200 h-20 bg-amber-600'>
        <label htmlFor="" className='capitalize font-bold'>Please leave a message</label> <br />
        <span>Message</span>
        <input type="text" className='bg-gray-400'/> <br />
        <button onClick={magic} className='bg-green-800 text-yellow-400 w-40 px-3 py-1 rounded-xl'>Send</button>
      </div>
      {/* footer */}
    </div>
  )
}

export default page
