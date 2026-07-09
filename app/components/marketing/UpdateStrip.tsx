import React from 'react'

const UpdateStrip = () => {
  return (
    <>
    <div className="bg-black h-10 w-full mt-23 flex items-center  justify-between text-center p-7 text-amber-300">
              <span className="font-black text-2xl text-white">Egan Community</span>
              <span className='text-sm bg-lime-500 px-2 font-bold text-green-800'>Gas: N2000</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lime-300 rounded-full "></div>
                <span className='text-lime-300'>Live</span>
              </div>
            </div>
    </>
  )
}

export default UpdateStrip
