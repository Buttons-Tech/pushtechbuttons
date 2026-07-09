import React from 'react'
import Image from 'next/image'


const Dreambox = () => {
  return (
   <div className='bg-purple-600 m-6 rounded-xl text-white py-4 flex items-center-safe justify-between  '>
           <div className='ml-20 text-xl text-white'>
            <span className='bg-purple-200 text-purple-800 px-4 py-1 rounded'> Learn Tech with</span><br />
               <span className='font-black text-4xl text-amber-400'>DreamBox</span> <br />
    
         
         <span>Product Design | Frontend dev| Backend dev</span><br />
         <button className='bg-amber-400 p-3 rounded-full text-sm text-black mt-3 w-full'>Join Class</button>
           </div>
        
         <Image
         height={300}
         width={200}
         loading='lazy'
         src="/brand/dreambox.png"
         className='pr-4'
         alt=''
         />
       </div>
  )
}

export default Dreambox
