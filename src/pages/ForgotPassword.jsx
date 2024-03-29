import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
export default function ForgotPassword() {
  const [email , setEmail] = useState("")

  function onChange(e){
   setEmail(e.target.value)
  }
  async function onSubmit(e){
       e.preventDefault();
       try {
        const auth = getAuth();
        toast.success("Email was sent")
        await sendPasswordResetEmail(auth , email);
       } catch (error) {
         toast.error("unable to send reset password")
       }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className='md :w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://images.pexels.com/photos/1669760/pexels-photo-1669760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="key" className='w-full rounded-2xl' />
        
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form  onSubmit={onSubmit}>
            <input className="mb-6 w-full px-4 py-2 text-xl text-gray-700
            bg-white border-gray-700 rounded transition ease-out " type="email" id="email"
            value={email}  onChange={ onChange} placeholder="email address"/>
            
            
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">Don't have a account?
                <Link to="/sign-up"
                className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1">Register</Link>
              </p>
              <p>
                <Link to = "/sign-in"  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">Sign in Insted!</Link>
              </p>
            </div>
            <button 
          type="submit"
          className="w-full bg-blue-600
           text-white px-7 py-3 
           rounded text-sm font-semibold 
           uppercase shadow-md
           hover:bg-blue-700
           transition duration-150 ease-in-out
           hover:shadow-lg
           active:bg-blue-800"
          >Send Reset Password</button>
          <div className="flex items-center my-4
            before:border-t before:flex-1 before:border-gray-300
           after:border-t after:flex-1 after:border-gray-300">
            <p className="text-center
            font-semibold mx-4">OR</p>
          </div>
          <OAuth/>
          </form>
        
        </div>
      </div>
    </section>
  )
}