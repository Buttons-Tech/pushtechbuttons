import React from 'react'
import Image from 'next/image'


const Nysc = () => {
  return (
     <div className='bg-amber-200 rounded-xl text-white flex items-center-safe justify-between  '>
            
             <Image
          height={300}
          width={200} 
          loading='eager'
          src="/images/cper.jpg"
           className='w-auto h-auto'
          alt=''
          />
            <div className='ml-20 text-xl text-amber-800 p-2 '>
                <span className='font-black text-4xl text-amber-600'>NYSC</span> <br />
    
          <span>Built and maintained by <span className='font-black'> Tech Corpers</span></span><br />
          <span className='text-black'>and the <span className='font-black '>Click Team</span> </span><br />
          <button className='bg-amber-800 p-3 rounded-full text-sm text-amber-200 mt-3 w-full'>Join next batch</button>
            </div>
         
         
        </div>
  )
}

export default Nysc
