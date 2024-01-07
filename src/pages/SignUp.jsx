import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import {db} from "../firebase";
import {getAuth , createUserWithEmailAndPassword , updateProfile} from "firebase/auth"
export default function SignUp() {
  const[showPassword , setShowPassword] =useState(false);
  const [formData , setFormData] = useState({
    name:"",
    email : "",
    password : "",
  })
  const{name,email , password} = formData;
  function onChange(e){
   setFormData((prevState)=>({
    ...prevState,
    [e.target.id]:e.target.value,
   }))
  }
  
   async function onSubmit(e){
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);
      updateProfile(auth.currentUser,{displayName : name})
      const user = userCredential.user
      console.log(user);
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className='md :w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://images.pexels.com/photos/1669760/pexels-photo-1669760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="key" className='w-full rounded-2xl' />
        
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit} >
          <input className="mb-6 w-full px-4 py-2 text-xl text-gray-700
            bg-white border-gray-700 rounded transition ease-out " type="text" id="name"
            value={name}  onChange={ onChange} placeholder="Full name"/>
            <input className="mb-6 w-full px-4 py-2 text-xl text-gray-700
            bg-white border-gray-700 rounded transition ease-out " type="email" id="email"
            value={email}  onChange={ onChange} placeholder="email address"/>
            <div className="relative mb-6">
            <input className="w-full px-4 py-2 text-xl text-gray-700
            bg-white border-gray-700 rounded transition ease-out "  type={showPassword ? "text":"password"} id="password"
            value={password}  onChange={ onChange} placeholder="password"/>
            {showPassword ? (<FaEyeSlash  className="absolute right-3 top-3 text-3xl cursor-pointer"onClick={()=>setShowPassword((prevState)=>!prevState)} />):(<FaEye  className="absolute right-3 top-3 text-3xl cursor-pointer" onClick={()=>setShowPassword((prevState)=>!prevState)}/>)}
            </div>
            
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">Have a account?
                <Link to="/sign-in"
                className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1">Sign in</Link>
              </p>
              <p>
                <Link to = "/forgot-password"  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">Forgot password?</Link>
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
          >Sign in</button>
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
    