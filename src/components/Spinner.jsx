import React from 'react'
import sinn from "../assets/svg/sinn.svg"
export default function Spinner() {
  return (
    <div className='bg-black bg-opacity-50 flex items-center justify-center
    left-0 bottom-0 top-0 z-50'>
      <div>
        <img src={sinn} alt="loading " className='h-24' />
      </div>
    </div>
  )
}
