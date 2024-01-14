import React from 'react'
import spinner from "../assets/svg/spinner.svg"
export default function Spinner() {
  return (
    <div className=' bg-opacity-50 flex items-center justify-center
    left-0 bottom-0 top-0 z-50'>
      <div>
        <img src={spinner} alt="loading " className='h-24' />
      </div>
    </div>
  )
}
